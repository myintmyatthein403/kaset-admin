import type { PopularTrackSchemaSchemaType } from "@/common/schemas/popular-track.schema";
import { type POPULAR_TRACK } from "@/common/types/type";
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
import { GenreForm } from "../genres/components/action-form";
import { PopularTrackForm } from "./components/action-form";

export const PopularTrackPage = () => {
  const {
    data,
    isPending,
    error,
    createMutation,
    updateMutation,
    deleteMutation
  } = useBaseHook<PopularTrackSchemaSchemaType>('popular-tracks', '/popular-tracks')

  const [open, setOpen] = useState<boolean>(false);
  const [editedItem, setEditedItem] = useState<POPULAR_TRACK | null>(null);
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
      tracks: []
    },
    onSubmit: async ({ value }) => {
      try {
        let trackIds;
        if (value.tracks && value.tracks.length > 0) {
          trackIds = value.tracks.map((track) => ({ id: track }))
        }
        if (editedItem) {
          await updateMutation.mutateAsync({ ...{ tracks: trackIds }, id: editedItem.id });
          setEditedItem(null);
        } else {
          await createMutation.mutateAsync({ tracks: trackIds } as PopularTrackSchemaSchemaType);
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



  if (isPending) return <h1>Loading...</h1>
  if (error) return <h1>Failed to Fetch...</h1>

  const tracksInfo = data?.data[0] ? data?.data[0].tracks.map((t: any) => {
    return {
      id: data?.data[0].id,
      name: t.name,
      description: t.description
    }
  }) : []

  const handleEdit = (item: POPULAR_TRACK) => {
    setEditedItem(item);
    form.setFieldValue("tracks", data?.data[0].tracks.map((track: any) => track.id));
  }

  const columns: ColumnDef<POPULAR_TRACK>[] = [
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
      header: "Tracks",
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
        const item = row.original as POPULAR_TRACK;
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
        title="Popular Tracks"
        actionButton={
          tracksInfo.length < 1 && (
            <Button variant='outline' type="button" onClick={() => {
              setEditedItem(null);
              form.reset();
              setOpen(true);
            }}>
              <Plus /> Add New
            </Button>
          )
        }
        dialogTitle="Create"
        dialogDescription=""
        createForm={<PopularTrackForm form={form} />}
        onFormSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        open={open}
        setOpen={setOpen}
        columns={columns}
        data={tracksInfo || []}
      />

      <ConfirmDeleteDialog
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        confirmDelete={handleConfirmDelete}
      />

      <ActionSheet
        title="Edit Popular Tracks"
        description=""
        updateForm={<PopularTrackForm form={form} />}
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
