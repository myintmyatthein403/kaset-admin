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
import type { MEDIA, PRODUCT } from "@/common/types/type";
import { ProductForm } from "./components/action-form";
import { useUploadSingleFile } from "@/hooks/use-upload-file.hook";
import { config } from "@/common/config/config";
import type { productSchemaType } from "@/common/schemas/product.schema";

export const ProductPage = () => {
  const {
    data,
    isPending,
    error,
    createMutation,
    updateMutation,
    deleteMutation
  } = useBaseHook<productSchemaType>('products', '/products')
  const uploadFile = useUploadSingleFile()

  const [open, setOpen] = useState<boolean>(false);
  const [editedItem, setEditedItem] = useState<PRODUCT | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [selectedItemId, setSelectedItemId] = useState<string>("");

  const handleDelete = (id: string) => {
    setIsDeleteDialogOpen(true);
    setSelectedItemId(id);
  }

  const handleConfirmDelete = () => {
    deleteMutation.mutate(selectedItemId);
    setIsDeleteDialogOpen(false);
  }

  const form = useForm({
    defaultValues: {
      name: "",
      slug: "",
      base_price: "",
      is_out_of_stock: false,
      included_item: "",
      product_image: null,
      product_category: null,
    },
    onSubmit: async ({ value }) => {
      try {
        let productImageId;
        if (value.product_image) {
          productImageId = await uploadFile.mutateAsync(value.product_image)
        }
        if (editedItem) {
          await updateMutation.mutateAsync({ ...value, product_image: productImageId, id: editedItem.id });
          setEditedItem(null);
        } else {
          await createMutation.mutateAsync({
            ...value,
            product_category: {
              id: value.product_category
            },
            product_image: productImageId
          } as productSchemaType);
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
      accessorKey: "product_image",
      header: "Product Image",
      cell: ({ row }) => {
        const media = row.getValue('product_image') as MEDIA;
        if (!media || !media.url) return null;
        const imgSrc = `${config.BASE_MEDIA_URL}${media.url}`;
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
        <div>{`/${row.getValue("slug")}` || '-'}</div>
      )
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
        data={data?.data || []}
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
