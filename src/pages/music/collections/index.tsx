import type { CollectionSchemaType } from "@/common/schemas/collection.schema";
import type { COLLECTION, MEDIA } from "@/common/types/type";
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
import { CollectionForm } from "./components/action-from";
import { config } from "@/common/config/config";

export const CollectionPage = () => {
  const {
    data,
    isPending,
    error,
    createMutation,
    updateMutation,
    uploadMutation,
    deleteMutation
  } = useBaseHook<CollectionSchemaType>('collections', '/collections')

  const [open, setOpen] = useState<boolean>(false);
  const [editedItem, setEditedItem] = useState<COLLECTION | null>(null);
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
      title: "",
      slug: "",
      tracks: [],
      backgroundImage: null,
    },
    onSubmit: async ({ value }) => {
      try {
        const {
          tracks,
          backgroundImage,
          ...restValue
        } = value;
        let imageId = editedItem?.background?.id || "";

        if (value?.backgroundImage) {
          const uploadImage = await uploadMutation.mutateAsync(value.backgroundImage);
          imageId = uploadImage.id;
        }
        let trackIds;

        if (tracks && tracks.length > 0) {
          trackIds = tracks.map((track) => ({ id: track }))
        }

        const finalPayload = {
          ...restValue,
          tracks: trackIds,
          background: imageId ? imageId : null,
        }


        if (editedItem) {
          await updateMutation.mutateAsync({ ...finalPayload, id: editedItem.id });
          setEditedItem(null);
        } else {
          await createMutation.mutateAsync(finalPayload as CollectionSchemaType);
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

  const handleEdit = (item: COLLECTION) => {
    setEditedItem(item);
    form.setFieldValue("title", item.title);
    form.setFieldValue("slug", item.slug);
    form.setFieldValue("tracks", item.tracks.map(track => track.id))
  }


  if (isPending) return <h1>Loading...</h1>
  if (error) return <h1>Failed to Fetch...</h1>

  const columns: ColumnDef<COLLECTION>[] = [
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
      accessorKey: "background",
      header: "Background Image",
      cell: ({ row }) => {
        const media = row.getValue('background') as MEDIA;
        const imgSrc = `${config.BASE_MEDIA_URL}${media?.url}`;
        return <img src={imgSrc} alt="background-image" className="w-15 h-15 rounded-full" />;
      },
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <div>{row.getValue("title")}</div>
      ),
    },
    {
      accessorKey: "slug",
      header: "slug",
      cell: ({ row }) => (
        <div>/{row.getValue("slug")}</div>
      )
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const item = row.original as COLLECTION;
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
        title="Collections"
        actionButton={
          <Button variant='outline' type="button" onClick={() => {
            setEditedItem(null);
            form.reset();
            setOpen(true);
          }}
            disabled={data?.data.length >= 3}
          >
            <Plus /> Add New
          </Button>
        }
        dialogTitle="Create"
        dialogDescription=""
        createForm={<CollectionForm form={form} />}
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
        title="Edit Collection"
        description=""
        updateForm={<CollectionForm form={form} />}
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
