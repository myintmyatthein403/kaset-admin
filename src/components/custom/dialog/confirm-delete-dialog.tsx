import { AlertDialogHeader, AlertDialogFooter, AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle } from "../../ui/alert-dialog"

interface ConfirmDeleteDialogProps {
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: (val: boolean) => void;
  confirmDelete: () => void;
}

export const ConfirmDeleteDialog = ({
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
  confirmDelete
}: ConfirmDeleteDialogProps) => {
  return (
    <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the track
            and all related data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={confirmDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
