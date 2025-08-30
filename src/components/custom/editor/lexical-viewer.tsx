import {
  LexicalComposer,
  type InitialConfigType,
} from "@lexical/react/LexicalComposer";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListItemNode, ListNode } from "@lexical/list";
import { LinkNode, AutoLinkNode } from "@lexical/link";

import { ContentEditable } from "@/components/editor/editor-ui/content-editable";
import { editorTheme } from "@/components/editor/themes/editor-theme";

interface LexicalViewerProps {
  lexicalJSON: string;
}

const editorConfig: InitialConfigType = {
  namespace: "LexicalViewer",
  theme: editorTheme,
  nodes: [
    HeadingNode,
    QuoteNode,
    ListNode,
    ListItemNode,
    LinkNode,
    AutoLinkNode,
    // Include all the nodes that might be in your JSON
  ],
  onError: (error) => {
    console.error(error);
  },
};

export const LexicalViewer = ({ lexicalJSON }: LexicalViewerProps) => {
  const initialEditorState = lexicalJSON || null;


  return (
    <LexicalComposer
      initialConfig={{
        ...editorConfig,
        // The most important part: set the editor to read-only
        editorState: initialEditorState,
        editable: false,
      }}
    >
      <div className="bg-background w-full overflow-hidden rounded-lg border">
        <RichTextPlugin
          contentEditable={
            <ContentEditable
              placeholder=""
              className="ContentEditable__root relative block px-8 py-4 focus:outline-none"
            />
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
      </div>
    </LexicalComposer>
  );
};
