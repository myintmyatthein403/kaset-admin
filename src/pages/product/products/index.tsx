import { ConfirmDeleteDialog } from "@/components/custom/dialog/confirm-delete-dialog";
import { ActionSheet } from "@/components/custom/sheet/sheet";
import { BaseContentLayout } from "@/components/layouts/base/base-content-layout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useBaseHook } from "@/hooks/base.hook"
import { useForm } from "@tanstack/react-form";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Edit2, Trash, Plus } from "lucide-react";
import { useState } from "react"
import { toast } from "sonner";
import type { MEDIA, PRODUCT, PRODUCT_VARIATION } from "@/common/types/type";
import { ProductForm } from "./components/action-form";
import { config } from "@/common/config/config";
import type { productSchemaType } from "@/common/schemas/product.schema";
import { StatusTextWithCircle } from "@/components/custom/typography/typography";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const ProductPage = () => {
  const {
    data,
    isPending,
    error,
    createMutation,
    updateMutation,
    softDeleteMutation,
    uploadMutation
  } = useBaseHook<productSchemaType>('products', '/products')

  const [open, setOpen] = useState<boolean>(false);
  const [editedItem, setEditedItem] = useState<PRODUCT | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [selectedItemId, setSelectedItemId] = useState<string>("");

  const products = data?.data.filter((p: any) => p.is_active)

  const handleDelete = (id: string) => {
    setIsDeleteDialogOpen(true);
    setSelectedItemId(id);
  }

  const handleConfirmDelete = () => {
    softDeleteMutation.mutate(selectedItemId);
    setIsDeleteDialogOpen(false);
  }

  const form = useForm({
    defaultValues: {
      name: "",
      slug: "",
      base_price: "",
      is_out_of_stock: false,
      included_item: "",
      productImages: [],
      product_category: null,
      product_images: [],
      variants: [],
      description: ""
    },
    onSubmit: async ({ value }) => {
      try {
        let productImageIds;
        const { productImages, variants, ...restValues } = value;
        if (productImages && productImages.length > 0) {
          const createdFiles = await Promise.all(productImages.map(async (productImage: any) => {
            const response = await uploadMutation.mutateAsync(productImage)
            return response?.id
          }))
          productImageIds = createdFiles.map((file) => ({ id: file }))
        }
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        const finalPayload = {
          ...restValues,
          ...(variants && variants.length > 0 && {
            variations: variants.map((v: any) => {
              const { id, ...rest } = v;
              if (uuidRegex.test(id)) {
                return v;
              } else {
                return rest
              }
            })
          }),
          ...(productImageIds && productImageIds.length > 0 && { product_images: productImageIds })
        }
        if (editedItem) {
          await updateMutation.mutateAsync({ ...finalPayload as any, id: editedItem.id });
          setEditedItem(null);
        } else {
          await createMutation.mutateAsync({
            ...finalPayload,
            product_category: {
              id: value.product_category
            },
            product_images: productImageIds
          } as any);
        }
        setOpen(false);
        form.reset();
        setEditedItem(null);
      } catch (error) {
        console.error("Form submission failed: ", error);
        toast.error("An error occurred during the submission.");
      }
    }
  }) as any;

  const handleEdit = (item: PRODUCT) => {
    setEditedItem(item);
    form.setFieldValue("name", item.name);
    form.setFieldValue("slug", item.slug);
    form.setFieldValue("base_price", item.base_price);
    form.setFieldValue("is_out_of_stock", item.is_out_of_stock);
    form.setFieldValue("about", item.about);
    form.setFieldValue("included_item", item.included_item);
    form.setFieldValue("product_category", item.product_category.id)
    form.setFieldValue("variants", item.variations);
    form.setFieldValue("product_images", item.product_images)
    form.setFieldValue("description", item.description)
    //form.setFieldValue("product_image", item.product_image.id)
  }


  if (isPending) return <h1>Loading...</h1>
  if (error) return <h1>Failed to Fetch...</h1>

  const columns: ColumnDef<PRODUCT>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "product_images",
      header: "Product Image",
      cell: ({ row }) => {
        const media = row.getValue('product_images') as MEDIA[];
        if (!media || !media[0]?.url) return null;
        const imgSrc = `${config.BASE_MEDIA_URL}${media[0]?.url
          }`;
        return <img src={imgSrc} alt="home-slide-show" className="w-15 h-15 rounded-full" />;
      },
    },
    {
      accessorKey: "name",
      header: "name",
      cell: ({ row }) => (
        <div>{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "slug",
      header: "Slug",
      cell: ({ row }) => (
        <div>{`/ ${row.getValue("slug")}` || '-'}</div>
      )
    },
    {
      accessorKey: "base_price",
      header: "Base Price",
      cell: ({ row }) => (
        <div>{`฿ ${row.getValue("base_price")}` || '-'}</div>
      )
    },
    {
      accessorKey: "is_out_of_stock",
      header: "Stock",
      cell: ({ row }) => {
        const stock = row.original.variations.reduce((acc: any, cur: any) => acc + cur.stock, 0)

        const status = stock == 0 ? 'failed' : 'success'
        const text = stock == 0 ? 'Out of Stock' : 'In Stock'

        return (
          <StatusTextWithCircle status={status} text={text} />
        )
      },
    },
    {
      accessorKey: "variations",
      header: "Variations",
      cell: ({ row }) => {
        const variations = row.getValue('variations') as PRODUCT_VARIATION[];
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="text-center cursor-pointer">{variations.length}</div>
              </TooltipTrigger>
              <TooltipContent>
                {/* Your tooltip content goes here */}
                <div>
                  {variations.length > 0 ? (
                    <ul>
                      {variations.map((variation, index) => (
                        <li
                          key={index}
                          className="flex items-center justify-between py-2 border-b border-gray-200"
                        >
                          <div className="flex items-center space-x-3">
                            {/* Color swatch and name */}
                            <span
                              className="inline-block w-4 h-4 rounded-full border border-gray-300"
                              style={{ backgroundColor: variation.color_code }}
                            ></span>
                            <span className="font-bold">{variation.color_name}</span>

                            {/* Size and SKU */}
                            <span className="text-sm text-gray-600">
                              <strong>Size:</strong> {variation.size}
                            </span>
                            <span className="text-sm text-gray-600">
                              <strong>SKU:</strong> {variation.sku}
                            </span>
                          </div>

                          {/* Price and status are now grouped and centered vertically */}
                          <div className="flex items-center space-x-2">
                            <span className="font-bold">${variation.price}</span>

                            {/* Use a container with a fixed width to prevent alignment shift */}
                            <span className="w-24 text-center">
                              {variation.is_out_of_stock ? (
                                <span className="text-red-500 font-bold">(Out of Stock)</span>
                              ) : (
                                <span className="text-green-500 font-bold">(In Stock)</span>
                              )}
                            </span>
                          </div>
                        </li>))}
                    </ul>
                  ) : (
                    <p>No variations available</p>
                  )}
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const item = row.original as PRODUCT;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0" type="button">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                  handleEdit(item);
                }}>
                <Edit2 /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDelete(item.id as string)}
              > <Trash className="text-red-500" /> Delete </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <>
      <BaseContentLayout
        title="Product"
        actionButton={
          <Button variant='outline' type="button" onClick={() => {
            setEditedItem(null);
            form.reset();
            setOpen(true);
          }}>
            <Plus /> Add New
          </Button>
        }
        dialogTitle="Create"
        dialogDescription=""
        createForm={<ProductForm form={form} />}
        onFormSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        open={open}
        setOpen={setOpen}
        columns={columns}
        data={products || []}
      />

      <ConfirmDeleteDialog
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        confirmDelete={handleConfirmDelete}
      />

      <ActionSheet
        title="Edit Product"
        description=""
        updateForm={<ProductForm form={form} />}
        onFormSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        open={!!editedItem}
        setOpen={() => setEditedItem(null)}
      />
    </>
  )
}
