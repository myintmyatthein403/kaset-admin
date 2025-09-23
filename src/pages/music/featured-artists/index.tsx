import type { FeaturedArtistSchemaSchemaType } from "@/common/schemas/featured-artist.schema";
import type { FEATURED_ARTIST } from "@/common/types/type";
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
import { FeaturedArtistForm } from "./components/action-form";

export const FeaturedArtistPage = () => {
  const {
    data,
    isPending,
    error,
    createMutation,
    updateMutation,
    deleteMutation
  } = useBaseHook<FeaturedArtistSchemaSchemaType>('featured-artists', '/featured-artists')

  const [open, setOpen] = useState<boolean>(false);
  const [editedItem, setEditedItem] = useState<FEATURED_ARTIST | null>(null);
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
      artists: []
    },
    onSubmit: async ({ value }) => {
      try {
        let artistIds;
        if (value.artists && value.artists.length > 0) {
          artistIds = value.artists.map((artist) => ({ id: artist }))
        }
        if (editedItem) {
          await updateMutation.mutateAsync({ ...{ artists: artistIds }, id: editedItem.id });
          setEditedItem(null);
        } else {
          await createMutation.mutateAsync({ artists: artistIds } as FeaturedArtistSchemaSchemaType);
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

  const artistsInfo = data?.data[0] ? data?.data[0].artists.map((t: any) => {
    return {
      id: data?.data[0].id,
      name: t.name,
      description: t.description
    }
  }) : []

  const handleEdit = (item: FEATURED_ARTIST) => {
    setEditedItem(item);
    form.setFieldValue("artists", data?.data[0].artists.map((artist: any) => artist.id));
  }

  const columns: ColumnDef<FEATURED_ARTIST>[] = [
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
        const item = row.original as FEATURED_ARTIST;
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
          artistsInfo.length < 1 && (
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
        createForm={<FeaturedArtistForm form={form} />}
        onFormSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        open={open}
        setOpen={setOpen}
        columns={columns}
        data={artistsInfo || []}
      />

      <ConfirmDeleteDialog
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        confirmDelete={handleConfirmDelete}
      />

      <ActionSheet
        title="Edit Popular Tracks"
        description=""
        updateForm={<FeaturedArtistForm form={form} />}
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
