import { useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/src/common/components/ui/dialog"
import { useForm } from "@tanstack/react-form"

export const TrackFormDialog = ({ isOpen, onOpenChange, track, onSave }) => {
  const form = useForm({
    defaultValues: { name: "", artist: "" },
  })

  useEffect(() => {
    if (track) {
      form.reset({ name: track.name, artist: track.artist })
    } else {
      form.reset({ name: "", artist: "" })
    }
  }, [track, form])

  const onSubmit = (values) => {
    onSave(track ? { ...track, ...values } : values)
    onOpenChange(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{track ? "Edit Track" : "Create New Track"}</DialogTitle>
        </DialogHeader>

      </DialogContent>
    </Dialog>
  )
}
