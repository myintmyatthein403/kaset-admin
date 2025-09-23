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
import type { LogoSettingSchemaType } from "@/common/schemas/logo-setting.schema";
import type { LOGO_SETTING, MEDIA } from "@/common/types/type";
import { LogoSettingForm } from "./components/action-form";
import { config } from "@/common/config/config";

export const LogoSettingPage = () => {
  const {
    data,
    isPending,
    error,
    createMutation,
    updateMutation,
    deleteMutation,
    uploadMutation
  } = useBaseHook<LogoSettingSchemaType>('logo_setting', '/logo')

  const [open, setOpen] = useState<boolean>(false);
  const [editedItem, setEditedItem] = useState<LOGO_SETTING | null>(null);
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
      logoImage: null
    },
    onSubmit: async ({ value }) => {
      try {
        let imageId = editedItem?.logo_image?.id || null;

        if (value.logoImage) {
          const uploadedImage = await uploadMutation.mutateAsync(value.logoImage);
          imageId = uploadedImage.id;
        }

        const payload = {
          name: value.name,
          logo_image: imageId ? { id: imageId } : undefined,
        };
        if (editedItem) {
          await updateMutation.mutateAsync({ ...payload, id: editedItem.id });
          setEditedItem(null);
        } else {
          await createMutation.mutateAsync(payload as LogoSettingSchemaType);
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

  const handleEdit = (item: LOGO_SETTING) => {
    setEditedItem(item);
    form.setFieldValue("name", item.name);
  }


  if (isPending) return <h1>Loading...</h1>
  if (error) return <h1>Failed to Fetch...</h1>

  const columns: ColumnDef<LOGO_SETTING>[] = [
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
      accessorKey: "logo_image",
      header: "Image",
      cell: ({ row }) => {
        const media = row.getValue('logo_image') as MEDIA;
        if (!media || !media.url) return null;
        const imgSrc = `${config.BASE_MEDIA_URL}${media.url}`;
        return <img src={imgSrc} alt="logo" className="w-15 h-15 rounded-full" />;
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
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const item = row.original as LOGO_SETTING;
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
        title="Logo Setting"
        actionButton={
          <Button variant='outline' type="button" onClick={() => {
            setEditedItem(null);
            form.reset();
            setOpen(true);
          }}
            disabled={data?.data.length > 0}
          >
            <Plus /> Add New
          </Button>
        }
        dialogTitle="Create"
        dialogDescription=""
        createForm={<LogoSettingForm form={form} />}
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
        title="Edit Logo Setting"
        description=""
        updateForm={<LogoSettingForm form={form} />}
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
