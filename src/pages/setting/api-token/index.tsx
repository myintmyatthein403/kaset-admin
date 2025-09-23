import { ConfirmDeleteDialog } from "@/components/custom/dialog/confirm-delete-dialog";
import { ActionSheet } from "@/components/custom/sheet/sheet";
import { BaseContentLayout } from "@/components/layouts/base/base-content-layout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useBaseHook } from "@/hooks/base.hook"
import { useForm } from "@tanstack/react-form";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Edit2, Trash, Plus, Copy } from "lucide-react";
import { useState } from "react"
import { toast } from "sonner";
import { ApiTokenForm } from "./components/action-form";
import type { ApiTokenSchemaType } from "@/common/schemas/api-token.schema";
import type { API_TOKEN } from "@/common/types/type";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { StatusTextWithCircle } from "@/components/custom/typography/typography";

export const ApiTokenPage = () => {
  const {
    data,
    isPending,
    error,
    createMutation,
    updateMutation,
    deleteMutation
  } = useBaseHook<ApiTokenSchemaType>('api-tokens', '/api-token')

  const [open, setOpen] = useState<boolean>(false);
  const [editedItem, setEditedItem] = useState<API_TOKEN | null>(null);
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
      client_name: "",
      is_active: true
    },
    onSubmit: async ({ value }) => {
      try {
        if (editedItem) {
          await updateMutation.mutateAsync({ ...value, id: editedItem.id });
          setEditedItem(null);
        } else {
          await createMutation.mutateAsync(value as ApiTokenSchemaType);
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

  const handleEdit = (item: API_TOKEN) => {
    setEditedItem(item);
    form.setFieldValue("key", item.key);
    form.setFieldValue("client_name", item.client_name);
    form.setFieldValue("is_active", item.is_active)
  }


  if (isPending) return <h1>Loading...</h1>
  if (error) return <h1>Failed to Fetch...</h1>

  const columns: ColumnDef<API_TOKEN>[] = [
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
      accessorKey: "key",
      header: "Key",
      cell: ({ row }) => {
        const [copied, setCopied] = useState(false);
        const key = row.getValue("key") as string;
        const maskedKey = "*".repeat(key.length);

        const handleCopy = () => {
          navigator.clipboard.writeText(key)
            .then(() => {
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            })
            .catch(err => {
              console.error("Failed to copy API key: ", err);
            });
        };

        return (
          <div className="flex items-center space-x-2">
            <span>{maskedKey}</span>
            <TooltipProvider>
              <Tooltip open={copied}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleCopy}
                    aria-label="Copy API Key"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-primary text-primary-foreground">
                  Copied!
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        );
      },
    },
    {
      accessorKey: "client_name",
      header: "Client Name",
      cell: ({ row }) => (
        <div>{row.getValue("client_name")}</div>
      )
    },
    {
      accessorKey: "is_active",
      header: "Show in Slide",
      cell: ({ row }) => {
        const status = row.getValue('is_active') ? 'success' : 'failed'
        const text = row.getValue('is_active') ? 'Active' : 'In Active'
        return (
          <StatusTextWithCircle status={status} text={text} />
        )
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const item = row.original as API_TOKEN;
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
        title="Api Tokens"
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
        createForm={<ApiTokenForm form={form} />}
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
        title="Edit Genre"
        description=""
        updateForm={<ApiTokenForm form={form} />}
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
