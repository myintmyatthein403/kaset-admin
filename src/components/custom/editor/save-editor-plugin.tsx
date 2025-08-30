import { useEditorStore } from "@/common/store/editorStore"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { useEffect, useRef } from "react" // useRef ကို ထပ်ထည့်ပါ

export function SaveEditorPlugin() {
  const [editor] = useLexicalComposerContext()
  const { setEditorContentJSON } = useEditorStore()

  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const removeListener = editor.registerUpdateListener(({ editorState }) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }

      timerRef.current = setTimeout(() => {
        editorState.read(() => {
          const json = editorState.toJSON()
          setEditorContentJSON(JSON.stringify(json))
          console.log("Autosaved JSON:", json)
        })
      }, 3000)

    })

    return () => {
      removeListener()
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [editor, setEditorContentJSON])

  return null
}
