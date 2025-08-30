import { useEffect } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import type { EditorState } from "lexical"
import { useEditorStore } from "@/common/store/editorStore"

export function LoadEditorPlugin() {
  const [editor] = useLexicalComposerContext()
  const jsonString = useEditorStore((state) => state.editorContentJSON)

  useEffect(() => {
    if (jsonString) {
      const json = JSON.parse(jsonString)
      const state: EditorState = editor.parseEditorState(json)
      editor.setEditorState(state)
    }
  }, [editor, jsonString])

  return null
}
