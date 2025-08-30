import { Button } from "@/components/ui/button"
import { AlbumCard } from "./components/album-card"
import { Plus } from "lucide-react"
import { useState } from "react"
import { AlbumForm } from "./album-from"
import { useForm } from "@tanstack/react-form"

const albumLists = [
  {
    id: "1",
    src: "https://plus.unsplash.com/premium_photo-1682125340805-c01b8a9a7aee?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Album Cover",
    title: "Album Title",
  },
  {
    id: "2",
    src: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    alt: "Album Cover",
    title: "Album Title 2",
  }
]

export const AlbumPage = () => {
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm({
    defaultValues: {
      title: '',
      artist: '',
      year: '',
      cover: '',
    },
    onSubmit: (values) => {
      console.log(values)
    }
  })

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Album List</h1>
        <Button onClick={() => setOpen(true)}>
          <Plus />
        </Button>
      </div>

      <div className="grid grid-cols-1 text-black sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {
          albumLists.map((album) => (
            <AlbumCard key={album.id} src={album.src} alt={album.alt} title={album.title} onEdit={() => console.log('edit')} onDelete={() => console.log('delete')} />
          ))
        }
      </div>

      <AlbumForm open={open} onOpenChange={setOpen} form={form} />
    </div>
  )
}
