import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import React from "react";

interface ActionFormDialogProps {
  actionButton: React.ReactNode;
  title: string;
  description: string;
  createForm: React.ReactNode;
  onFormSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  open: boolean;
  setOpen: (val: boolean) => void
  // Add a way to control the dialog state if needed
}

export const ActionFormDialog = ({
  actionButton,
  title,
  description,
  createForm,
  open,
  setOpen,
  onFormSubmit,
}: ActionFormDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {actionButton}
      </DialogTrigger>
      <DialogContent className="sm:max-w-1/2">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <form onSubmit={onFormSubmit}>
          {createForm}
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
