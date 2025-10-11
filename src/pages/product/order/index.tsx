import { type GENRE, type PRODUCT_VARIATION } from "@/common/types/type";
import { ConfirmDeleteDialog } from "@/components/custom/dialog/confirm-delete-dialog";
import { ActionSheet } from "@/components/custom/sheet/sheet";
import { BaseContentLayout } from "@/components/layouts/base/base-content-layout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useBaseHook } from "@/hooks/base.hook"
import { useForm } from "@tanstack/react-form";
import type { ColumnDef } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { useState } from "react"
import { toast } from "sonner";
import type { genreSchemaType } from "@/common/schemas/genre.schema";
import { OrderForm } from "./component/action-form";
import { StatusTextWithCircle } from "@/components/custom/typography/typography";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useNavigate } from "@tanstack/react-router";

export const OrderPage = () => {
  const {
    data,
    isPending,
    error,
    createMutation,
    updateMutation,
    deleteMutation
  } = useBaseHook<genreSchemaType>('orders', '/order')

  const [open, setOpen] = useState<boolean>(false);
  const [editedItem, setEditedItem] = useState<GENRE | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [selectedItemId, setSelectedItemId] = useState<string>("");
  const navigate = useNavigate()

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
      description: ""
    },
    onSubmit: async ({ value }) => {
      try {
        if (editedItem) {
          await updateMutation.mutateAsync({ ...value, id: editedItem.id });
          setEditedItem(null);
        } else {
          await createMutation.mutateAsync(value as genreSchemaType);
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

  const handleEdit = (item: GENRE) => {
    setEditedItem(item);
    form.setFieldValue("name", item.name);
    form.setFieldValue("description", item.description);
  }

  const handleClick = (rowData: any) => {
    navigate({ to: '/product/orders/$orderId', params: { orderId: rowData.id } });
  }

  if (isPending) return <h1>Loading...</h1>
  if (error) return <h1>Failed to Fetch...</h1>

  const columns: ColumnDef<GENRE>[] = [
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
      accessorKey: "id",
      header: "Order Number",
      cell: ({ row }) => (
        <div>{row.getValue("id")}</div>
      ),
    },
    {
      accessorKey: "customer",
      header: "Customer",
      cell: ({ row }) => (
        <div>{(row.getValue("customer") as any)?.name}</div>
      )
    },
    {
      accessorKey: "order_status",
      header: "Order Status",
      cell: ({ row }) => {
        const text = row.getValue("order_status") as string;
        const status = text.toLowerCase();
        return (
          <StatusTextWithCircle status={status} text={text} />
        )
      },
    },
    {
      accessorKey: "payment_status",
      header: "Payment Status",
      cell: ({ row }) => {
        const text = row.getValue("payment_status") as string;
        const status = text.toLowerCase();
        return (
          <StatusTextWithCircle status={status} text={text} />
        )
      },
    },
    {
      accessorKey: "order_items",
      header: "Variations",
      cell: ({ row }) => {
        const variations = row.getValue('order_items') as PRODUCT_VARIATION[];
        console.log(variations)
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="text-center cursor-pointer">{variations?.length}</div>
              </TooltipTrigger>
              <TooltipContent>
                {/* Your tooltip content goes here */}
                <div>
                  {variations?.length > 0 ? (
                    <ul>
                      {variations?.map((v: any, index) => (
                        <li
                          key={index}
                          className="flex items-center justify-between py-2 border-b border-gray-200"
                        >
                          <div className="flex items-center space-x-3">
                            {/* Color swatch and name */}
                            <span
                              className="inline-block w-4 h-4 rounded-full border border-gray-300"
                              style={{ backgroundColor: v?.variation?.color_code ?? '' }}
                            ></span>
                            <span className="font-bold">{v?.variation?.color_name ?? ''}</span>

                            {/* Size and SKU */}
                            <span className="text-sm text-gray-600">
                              <strong>Size:</strong> {v?.variation?.size ?? ''}
                            </span>
                            <span className="text-sm text-gray-600">
                              <strong>SKU:</strong> {v?.variation?.sku}
                            </span>
                          </div>

                          {/* Price and status are now grouped and centered vertically */}
                          <div className="flex items-center space-x-2">
                            <span className="font-bold">${v?.variation?.price}</span>

                            {/* Use a container with a fixed width to prevent alignment shift 
                            <span className="w-24 text-center">
                              {v?.variation?.is_out_of_stock ? (
                                <span className="text-red-500 font-bold">(Out of Stock)</span>
                              ) : (
                                <span className="text-green-500 font-bold">(In Stock)</span>
                              )}
                            </span>
                            */}
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
      accessorKey: "createdAt",
      header: "Ordered Time",
      cell: ({ row }) => {
        const orderedTime = row.getValue("createdAt") as any
        const dateObject = new Date(orderedTime)
        return (
          <span>{dateObject.toLocaleString()}</span>
        )
      },
    },
    {
      accessorKey: "new",
      header: "",
      cell: ({ row }) => {
        const payment_status = row.getValue("payment_status");
        const order_status = row.getValue("order_status");
        const isNew = payment_status === "paid" && order_status === "pending"
        return (
          <>
            {isNew && <span className="text-green-500">New</span>}
          </>
        )
      },
    },

  ];

  return (
    <>
      <BaseContentLayout
        title="Orders"
        actionButton={
          <Button variant='outline' type="button" onClick={() => {
            setEditedItem(null);
            form.reset();
            setOpen(true);
          }} disabled>
            <Plus /> Add New
          </Button>
        }
        dialogTitle="Create"
        dialogDescription=""
        createForm={<OrderForm form={form} />}
        onFormSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        open={open}
        setOpen={setOpen}
        columns={columns}
        data={data?.data || []}
        handleClick={handleClick}
      />

      <ConfirmDeleteDialog
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        confirmDelete={handleConfirmDelete}
      />

      <ActionSheet
        title="Edit Genre"
        description=""
        updateForm={<OrderForm form={form} />}
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
