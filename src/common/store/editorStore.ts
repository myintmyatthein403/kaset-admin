import { create } from "zustand"

interface EditorStore {
  editorContentJSON: string // serialized Lexical JSON
  setEditorContentJSON: (json: string) => void
}

export const useEditorStore = create<EditorStore>((set) => ({
  editorContentJSON: "",
  setEditorContentJSON: (json) => set({ editorContentJSON: json }),
}))
