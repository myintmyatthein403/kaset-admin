import React from "react";
import { DataTable } from "../../custom/data-table/data-table"
import { ActionFormDialog } from "../../custom/dialog/action-form-dialog"
import type { ColumnDef } from "@tanstack/react-table";

interface BaseContentLayoutProps {
  title: string;
  actionButton: React.ReactNode;
  dialogTitle: string;
  dialogDescription: string;
  createForm: React.ReactNode;
  onFormSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  open: boolean;
  setOpen: (val: boolean) => void;
  columns: ColumnDef<any>[];
  data: any[];
}

export const BaseContentLayout = ({
  title,
  actionButton,
  dialogTitle,
  dialogDescription,
  createForm,
  onFormSubmit,
  open,
  setOpen,
  columns,
  data,
}: BaseContentLayoutProps) => {
  return (
    <div className="px-6 py-10 flex flex-col gap-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">{title}</h1>
        <ActionFormDialog
          actionButton={actionButton}
          title={dialogTitle}
          description={dialogDescription}
          createForm={createForm}
          onFormSubmit={onFormSubmit}
          open={open}
          setOpen={setOpen}
        />
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
