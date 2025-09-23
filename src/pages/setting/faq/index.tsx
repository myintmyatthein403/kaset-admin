import type { FAQ } from "@/common/types/type"
import { BaseContentLayout } from "@/components/layouts/base/base-content-layout"
import { Button } from "@/components/ui/button"
import { useForm } from "@tanstack/react-form"
import { Edit2, MoreHorizontal, Plus, Trash } from "lucide-react"
import { useState } from "react"
import { FAQForm } from "./components/create-form"
import { ConfirmDeleteDialog } from "@/components/custom/dialog/confirm-delete-dialog"
import { ActionSheet } from "@/components/custom/sheet/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { useFAQ } from "./hooks/use-faq.hook"
import type { FAQSchemaType } from "@/common/schemas/faq.schmea"
import { toast } from "sonner"

export const FAQPage = () => {
  const {
    data,
    isPending,
    error,
    createMutation,
    updateMutation,
    deleteMutation
  } = useFAQ();

  const [open, setOpen] = useState<boolean>(false);
  const [editedFaq, setEditedFaq] = useState<FAQ | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [selectedFaqId, setSelectedFaqId] = useState<string>("");

  const handleDelete = (id: string) => {
    setIsDeleteDialogOpen(true);
    setSelectedFaqId(id);
  }

  const handleConfirmDelete = () => {
    deleteMutation.mutate(selectedFaqId);
    setIsDeleteDialogOpen(false);
  }

  const form = useForm({
    defaultValues: {
      question: "",
      answer: "",
    },
    onSubmit: async ({ value }) => {
      try {
        if (editedFaq) {
          await updateMutation.mutateAsync({
            id: editedFaq.id as string,
            updatedData: value,
          })
          setEditedFaq(null);
        } else {
          await createMutation.mutateAsync(value as FAQSchemaType)
        }
        setOpen(false);
        form.reset();
        setEditedFaq(null);
      } catch (error) {
        console.error("Form submission failed: ", error);
        toast.error("An error occurred during the submission.");
      }
    }
  }) as any

  const handleEdit = (faq: FAQ) => {
    setEditedFaq(faq);
    form.setFieldValue("question", faq.question);
    form.setFieldValue("answer", faq.answer);
  }

  if (isPending) return <h1>Loading...</h1>
  if (error) return <h1>Failed to Fetch...</h1>

  const columns: ColumnDef<FAQ>[] = [
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
      accessorKey: "question",
      header: "Questions",
      cell: ({ row }) => (
        <div>{row.getValue("question")}</div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const faq = row.original as FAQ;
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
                  handleEdit(faq);
                }}>
                <Edit2 /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDelete(faq.id as string)}
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
        title="Frequently Asked Questions"
        actionButton={
          <Button variant='outline' type="button" onClick={() => {
            setEditedFaq(null);
            form.reset();
            setOpen(true);
          }}>
            <Plus /> Add New
          </Button>
        }
        dialogTitle="Create"
        dialogDescription="Add a new FAQ to help users understand more about Kaset"
        createForm={<FAQForm form={form} />}
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
        title="Edit FAQ"
        description="Edit the FAQ to help users understand more about Kaset"
        updateForm={<FAQForm form={form} />}
        onFormSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        open={!!editedFaq}
        setOpen={() => setEditedFaq(null)}
      />
    </>
  )
}
