'use client'

import { useEditor, EditorContent, Editor } from '@tiptap/react'
import BulletList from '@tiptap/extension-bullet-list'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import Image from '@tiptap/extension-image'
import Blockquote from '@tiptap/extension-blockquote'
import Document from '@tiptap/extension-document'
import Heading from '@tiptap/extension-heading'
import ListItem from '@tiptap/extension-list-item'
import Youtube from '@tiptap/extension-youtube'
import TextAlign from '@tiptap/extension-text-align'
import StarterKit from '@tiptap/starter-kit'
import { Button } from '../ui/button'
import { useEffect } from 'react'

const Tiptap = ({ onChange }: { onChange: (content: string) => void }) => {
  const editor = useEditor({
    extensions: [StarterKit, Image, Document, Blockquote, BulletList, Heading, HorizontalRule, ListItem, Youtube,  TextAlign],
    content: '<p>Hello, World!</p>',
    onUpdate: ({ editor }) => {
        const content = editor.getHTML()
        onChange(content)
      },
  })

  useEffect(() => {
    return () => {
      if (editor) {
        editor.destroy() // Clean up when the component unmounts
      }
    }
  }, [editor])

  if (!editor) return null

  return (
    <>
      <div className="control-group">
        <div className="button-group">
          <Button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive('bulletList') ? 'is-active' : ''}
          >
            Toggle bullet list
          </Button>
          <Button
            onClick={() => editor.chain().focus().splitListItem('listItem').run()}
            disabled={!editor.can().splitListItem('listItem')}
          >
            Split list item
          </Button>
          <Button
            onClick={() => editor.chain().focus().sinkListItem('listItem').run()}
            disabled={!editor.can().sinkListItem('listItem')}
          >
            Sink list item
          </Button>
          <Button
            onClick={() => editor.chain().focus().liftListItem('listItem').run()}
            disabled={!editor.can().liftListItem('listItem')}
          >
            Lift list item
          </Button>
        </div>
      </div>

      <EditorContent editor={editor} />
    </>)
}

export default Tiptap
