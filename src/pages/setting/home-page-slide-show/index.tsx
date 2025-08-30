import { BaseContentLayout } from "@/components/layouts/base/base-content-layout";
import { Button } from "@/components/ui/button";
import { Edit2, MoreHorizontal, Plus, Trash } from "lucide-react";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ConfirmDeleteDialog } from "@/components/custom/dialog/confirm-delete-dialog";
import { HomePageSlideShowForm } from "./components/form";
import type { HOME_SLIDE_SHOW, MEDIA } from "@/common/types/type";
import { config } from "@/common/config/config";
import { useHomeSlideShow } from "./hooks/use-home-slide-show.hook";
import { ActionSheet } from "@/components/custom/sheet/sheet";
import { toast } from "sonner";
import { type HomeSlideShowSchemaType } from "@/common/schemas/home-slide-show.schema";
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
  } = useHomeSlideShow();

  const [open, setOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [selectedSlideShowId, setSelectedSlideShowId] = useState<string>("");
  const [editedSlideShow, setEditedSlideShow] = useState<HOME_SLIDE_SHOW | null>(null);

  const handleDelete = (id: string) => {
    setIsDeleteDialogOpen(true);
    setSelectedSlideShowId(id);
  };

  const handleConfirmDelete = () => {
    deleteMutation.mutate(selectedSlideShowId);
    setIsDeleteDialogOpen(false);
  };

  const form = useForm({
    defaultValues: {
      title: "",
      sub_title: "",
      button_text: "",
      url: "",
      is_active: true,
      slideShowImage: null,
    },
    onSubmit: async ({ value }) => {
      try {
        let imageId = editedSlideShow?.image?.id || null;

        if (value.slideShowImage) {
          const uploadedImage = await uploadMutation.mutateAsync(value.slideShowImage);
          imageId = uploadedImage.id;
        }

        const payload = {
          title: value.title,
          sub_title: value.sub_title,
          button_text: value.button_text,
          url: value.url,
          is_active: value.is_active,
          image: imageId ? { id: imageId } : undefined,
        };

        if (editedSlideShow) {
          await updateMutation.mutateAsync({
            id: editedSlideShow.id as string,
            updatedData: payload
          });
          setEditedSlideShow(null);
        } else {
          await createMutation.mutateAsync(payload as HomeSlideShowSchemaType);
        }
        setOpen(false);
        form.reset();
      } catch (error) {
        console.error("Form submission failed:", error);
        toast.error("An error occurred during form submission.");
      }
    },
  }) as any;


  const handleEdit = (slideShow: HOME_SLIDE_SHOW) => {
    setEditedSlideShow(slideShow);
    form.setFieldValue("title", slideShow.title)
    form.setFieldValue("sub_title", slideShow.sub_title)
    form.setFieldValue("button_text", slideShow.button_text)
    form.setFieldValue("url", slideShow.url)
  };

  if (isPending) return <h1>Loading...</h1>;
  if (error) return <h1>Failed to Fetch...</h1>;

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
  ];

  return (
    <>
      <BaseContentLayout
        title="Home Page Slide Show"
        actionButton={
          <Button variant="outline" type="button" onClick={() => {
            setEditedSlideShow(null);
            form.reset();
            setOpen(true);
          }}>
            <Plus /> Add New
          </Button>
        }
        dialogTitle="Create"
        dialogDescription="Fill out the form to add a new home page slide show."
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
        title="Edit Slide Show"
        description="Update the home page slide show."
        updateForm={<HomePageSlideShowForm form={form} />}
        onFormSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
          form.reset(); // form ကိုလည်း reset လုပ်ပေးပါ
          setEditedSlideShow(null); // edited state ကိုလည်း reset လုပ်ပါ
        }}
        open={!!editedSlideShow}
        setOpen={() => setEditedSlideShow(null)}
      />
    </>
  );
};
