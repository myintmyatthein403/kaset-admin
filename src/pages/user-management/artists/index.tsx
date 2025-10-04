import { type USER_PROFILE } from "@/common/types/type";
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
import { ArtistForm } from "./components/action-form";
import type { ArtistSchemaType } from "@/common/schemas/artist.schema";
import { nanoid } from "nanoid";

export const ArtistPage = () => {

  const {
    data,
    isPending,
    error,
    deleteMutation,
    uploadMutation,
    updateMutation: updateArtistMutation,
    createMutation: createArtistMutation
  } = useBaseHook('art', '/artist');

  const [open, setOpen] = useState<boolean>(false);
  const [editedItem, setEditedItem] = useState<USER_PROFILE | null>(null);
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

  type FormValues = {
    name: string;
    pairs: { id: string; dropdownValue: string; textValue: string }[];
    coverImage: any;
    profileImage: any;
    featured_video: string;
  };

  const form = useForm({
    defaultValues: {
      name: "",
      slug: "",
      bio: "",
      pairs: [{ id: nanoid(), dropdownValue: '', textValue: '' }],
      coverImage: null,
      profileImage: null,
      featured_video: ""
    } as FormValues,
    onSubmit: async ({ value }) => {
      try {
        const {
          coverImage,
          profileImage,
          ...restValues
        } = value;
        let coverImageId;
        let profileImageId;

        if (coverImage) {
          coverImageId = await uploadMutation.mutateAsync(coverImage);
        }
        if (profileImage) {
          profileImageId = await uploadMutation.mutateAsync(profileImage);
        }
        const finalPayload = {
          cover_image: coverImageId ? coverImageId : null,
          profile_image: profileImageId ? profileImageId : null,
          ...restValues
        }
        if (editedItem) {
          await updateArtistMutation.mutateAsync({ ...finalPayload, id: editedItem.id });
          setEditedItem(null);
        } else {
          await createArtistMutation.mutateAsync(finalPayload)

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

  const handleEdit = (item: USER_PROFILE) => {
    setEditedItem(item);
    const { social_media_links } = item;
    console.log(social_media_links)
    if (social_media_links && social_media_links.length > 0) {
      const formattedPairs = social_media_links.map((link: any) => ({
        id: link.id || nanoid(),
        dropdownValue: link.platform.id,
        textValue: link.url,
      }));
      form.setFieldValue("pairs", formattedPairs);
    } else {
      form.setFieldValue("pairs", [{ id: nanoid(), dropdownValue: '', textValue: '' }]);
    }
    form.setFieldValue("name", item.name);
    form.setFieldValue("slug", item.slug);
    form.setFieldValue("bio", item.bio);
    form.setFieldValue("location", item.location);
    form.setFieldValue("email", item.email);
    form.setFieldValue("featured_video", item.featured_video)
  }

  if (isPending) return <h1>Loading...</h1>
  if (error) return <h1>Failed to Fetch...</h1>

  const columns: ColumnDef<USER_PROFILE>[] = [
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
      header: "Name",
      cell: ({ row }) => (
        <div>{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "slug",
      header: "Slug",
      cell: ({ row }) => (
        <div>{row.getValue("slug")}</div>
      ),
    },
    {
      accessorKey: "location",
      header: "Location",
      cell: ({ row }) => (
        <div>{row.getValue("location") || '-'}</div>
      )
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const item = row.original as USER_PROFILE;
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
        title="Artist"
        actionButton={
          <Button variant='outline' type="button" onClick={() => {
            setEditedItem(null);
            form.reset();
            setOpen(true);
          }}>
            <Plus /> Add New
          </Button>
        }
        dialogTitle="Create new artist"
        dialogDescription=""
        createForm={<ArtistForm form={form} />}
        onFormSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        open={open}
        setOpen={setOpen}
        columns={columns}
        data={data || []}
      />

      <ConfirmDeleteDialog
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        confirmDelete={handleConfirmDelete}
      />

      <ActionSheet
        title="Edit Artist"
        description=""
        updateForm={<ArtistForm form={form} />}
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
