import "./MenuBar.css";
import type { Editor } from "@tiptap/react";

import { MenuItem } from "./MenuItem";
import { Fragment } from "react";

export default function MenuBar({ editor }: { editor: Editor }) {
  const items = [
    {
      icon: "heading-1",
      title: "Heading 1",
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: () => editor.isActive("heading", { level: 1 }),
    },
    {
      icon: "heading-2",
      title: "Heading 2",
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: () => editor.isActive("heading", { level: 2 }),
    },
    {
      icon: "pilcrow",
      title: "Paragraph",
      action: () => editor.chain().focus().setParagraph().run(),
      isActive: () => editor.isActive("paragraph"),
    },
    {
      icon: "list",
      title: "Bullet List",
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: () => editor.isActive("bulletList"),
    },
    {
      icon: "quote",
      title: "Blockquote",
      action: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: () => editor.isActive("blockquote"),
    },
    {
      icon: "separator-horizontal",
      title: "Horizontal Rule",
      action: () => editor.chain().focus().setHorizontalRule().run(),
    },
    {
      icon: "image",
      title: "Image",
      action: () => {
        const url = window.prompt("Enter the URL of the image:");
        if (url) {
          editor.chain().focus().setImage({ src: url }).run();
        }
      },
    },
    {
      icon: "youtube",
      title: "YouTube",
      action: () => {
        const url = window.prompt("Enter the YouTube video URL:");
        if (url) {
          editor.chain().focus().setYoutubeVideo({ src: url }).run();
        }
      },
    },
    {
      icon: "align-left",
      title: "Align Left",
      action: () => editor.chain().focus().setTextAlign("left").run(),
      isActive: () => editor.isActive({ textAlign: "left" }),
    },
    {
      icon: "align-center",
      title: "Align Center",
      action: () => editor.chain().focus().setTextAlign("center").run(),
      isActive: () => editor.isActive({ textAlign: "center" }),
    },
    {
      icon: "align-right",
      title: "Align Right",
      action: () => editor.chain().focus().setTextAlign("right").run(),
      isActive: () => editor.isActive({ textAlign: "right" }),
    },
    {
      icon: "align-justify",
      title: "Align Justify",
      action: () => editor.chain().focus().setTextAlign("justify").run(),
      isActive: () => editor.isActive({ textAlign: "justify" }),
    },
    // {
    //   type: 'divider',
    // },
    // {
    //   icon: 'arrow-go-back-line',
    //   title: 'Undo',
    //   action: () => editor.chain().focus().undo().run(),
    // },
    // {
    //   icon: 'arrow-go-forward-line',
    //   title: 'Redo',
    //   action: () => editor.chain().focus().redo().run(),
    // },
  ];

  return (
    <div className="editor__header">
      {items.map((item, index) => (
        <Fragment key={index}>
          <MenuItem {...item} />
        </Fragment>
      ))}
    </div>
  );
}
