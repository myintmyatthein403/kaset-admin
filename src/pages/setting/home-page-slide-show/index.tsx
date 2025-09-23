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
import { config } from "@/common/config/config";
import type { HomeSlideShowSchemaType } from "@/common/schemas/home-slide-show.schema";
import type { HOME_SLIDE_SHOW, MEDIA } from "@/common/types/type";
import { HomePageSlideShowForm } from "./components/form";
import { StatusTextWithCircle } from "@/components/custom/typography/typography";

export const HomePageSlideShowPage = () => {
  const {
    data,
    isPending,
    error,
    createMutation,
    updateMutation,
    deleteMutation,
    uploadMutation
  } = useBaseHook<HomeSlideShowSchemaType>('home-slide-show', '/home-slide-show')

  const [open, setOpen] = useState<boolean>(false);
  const [editedItem, setEditedItem] = useState<HOME_SLIDE_SHOW | null>(null);
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
      sub_title: "",
      button_text: "",
      url: "",
      slideShowImage: null,
      is_active: true,
    },
    onSubmit: async ({ value }) => {
      try {
        let iconId = editedItem?.image?.id || "";

        if (value.slideShowImage) {
          const uploadImage = await uploadMutation.mutateAsync(value.slideShowImage);
          iconId = uploadImage.id;
        }
        const payload = {
          title: value.title,
          sub_title: value.sub_title,
          button_text: value.button_text,
          url: value.url,
          is_active: value.is_active,
          image: iconId ? { id: iconId } : undefined
        }

        if (editedItem) {
          await updateMutation.mutateAsync({ ...payload, id: editedItem.id });
          setEditedItem(null);
        } else {
          await createMutation.mutateAsync(payload as HomeSlideShowSchemaType);
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

  const handleEdit = (item: HOME_SLIDE_SHOW) => {
    setEditedItem(item);
    form.setFieldValue("title", item.title);
    form.setFieldValue("sub_title", item.sub_title);
    form.setFieldValue("button_text", item.button_text);
    form.setFieldValue("url", item.url);
    form.setFieldValue("is_active", item.is_active);
  }


  if (isPending) return <h1>Loading...</h1>
  if (error) return <h1>Failed to Fetch...</h1>

  const columns: ColumnDef<HOME_SLIDE_SHOW>[] = [
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
      accessorKey: "image",
      header: "Image",
      cell: ({ row }) => {
        const media = row.getValue('image') as MEDIA;
        if (!media || !media.url) return null;
        const imgSrc = `${config.BASE_MEDIA_URL}${media.url}`;
        return <img src={imgSrc} alt="home-slide-show" className="w-15 h-15 rounded-full" />;
      },
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("title")}</div>
      ),
    },
    {
      accessorKey: "sub_title",
      header: "Sub Title",
      cell: ({ row }) => <div className="lowercase">{row.getValue("sub_title")}</div>,
    },
    {
      accessorKey: "url",
      header: "Url",
      cell: ({ row }) => <div className="lowercase">{row.getValue("url")}</div>,
    },
    {
      accessorKey: "is_active",
      header: "Show in Slide",
      cell: ({ row }) => {
        const status = row.getValue('is_active') ? 'success' : 'failed'
        const text = row.getValue('is_active') ? 'Show in slide-show' : 'Hide in slide-show'
        return (
          <StatusTextWithCircle status={status} text={text} />
        )
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const slideShow = row.original as HOME_SLIDE_SHOW;
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
                  e.preventDefault(); // dropdown ကို ချက်ချင်းမပိတ်အောင် ကာကွယ်ခြင်း
                  handleEdit(slideShow); // edit state တွေ set လုပ်ပြီး ActionSheet ကို ဖွင့်ခြင်း
                }}>
                <Edit2 /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDelete(slideShow.id as string)}
              > <Trash className="text-red-500" /> Delete </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ]; return (
    <>
      <BaseContentLayout
        title="Platform"
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
        createForm={<HomePageSlideShowForm form={form} />}
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
        updateForm={<HomePageSlideShowForm form={form} />}
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
