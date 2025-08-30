import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import type { ReactNode } from "react"

interface ActionSheetProps {
  title: string;
  description: string;
  updateForm: ReactNode;
  open: boolean;
  setOpen: (val: boolean) => void;
  onFormSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export function ActionSheet({
  title,
  description,
  updateForm,
  open,
  setOpen,
  onFormSubmit
}: ActionSheetProps) {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="p-4 sm:max-w-xl md:max-w-2xl lg:max-w-4xl">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>
            {description}
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={onFormSubmit}>
          {updateForm}
          <SheetFooter>
            <Button type="submit">Save changes</Button>
            <SheetClose asChild>
              <Button variant="outline" type="button">Close</Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}
