import { type ALBUM, type GENRE } from "@/common/types/type";
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
import type { genreSchemaType } from "@/common/schemas/genre.schema";
import { AlbumForm } from "./components/action-form";

export const AlbumPage = () => {
  const {
    data,
    isPending,
    error,
    createMutation,
    uploadMutation,
    updateMutation,
    deleteMutation,
  } = useBaseHook<genreSchemaType>('albums', '/album')

  const [open, setOpen] = useState<boolean>(false);
  const [editedItem, setEditedItem] = useState<ALBUM | null>(null);
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
      description: "",
      slug: "",
      artists: [],
      tracks: [],
      coverImage: null,
    },
    onSubmit: async ({ value }) => {
      try {
        const {
          artists,
          tracks,
          coverImage,
          ...restValue
        } = value;
        let imageId = editedItem?.cover?.id || "";

        if (value?.coverImage) {
          const uploadImage = await uploadMutation.mutateAsync(value.coverImage);
          imageId = uploadImage.id;
        }
        let artistIds;
        let trackIds;

        if (artists && artists.length > 0) {
          artistIds = artists.map((artist) => ({ id: artist }))
        }
        if (tracks && tracks.length > 0) {
          trackIds = tracks.map((track) => ({ id: track }))
        }

        const finalPayload = {
          ...restValue,
          artists: artistIds,
          tracks: trackIds,
          cover: imageId ? imageId : null,
        }

        if (editedItem) {
          await updateMutation.mutateAsync({ ...finalPayload, id: editedItem.id });
          setEditedItem(null);
        } else {
          await createMutation.mutateAsync(finalPayload as genreSchemaType);
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

  const handleEdit = (item: ALBUM) => {
    setEditedItem(item);
    form.setFieldValue("name", item.name);
    form.setFieldValue("description", item.description);
    form.setFieldValue("slug", item.slug);
    form.setFieldValue("tracks", item.tracks.map(track => track.id))
    form.setFieldValue("artists", item.artists.map(artist => artist.id))
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
      accessorKey: "name",
      header: "name",
      cell: ({ row }) => (
        <div>{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "description",
      header: "description",
      cell: ({ row }) => (
        <div>{row.getValue("description") || '-'}</div>
      )
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const item = row.original as ALBUM;
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
        title="Albums"
        actionButton={
          <Button variant='outline' type="button" onClick={() => {
            setEditedItem(null);
            form.reset();
            setOpen(true);
          }}>
            <Plus /> Add New
          </Button>
        }
        dialogTitle="Create New Album"
        dialogDescription=""
        createForm={<AlbumForm form={form} />}
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
        updateForm={<AlbumForm form={form} />}
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
