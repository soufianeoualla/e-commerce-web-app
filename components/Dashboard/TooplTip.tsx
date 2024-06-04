"use client";
import { type Editor } from "@tiptap/react";
import React from "react";
import {
  Bold,
  Strikethrough,
  Italic,
  List,
  ListOrdered,
  Heading2,
} from "lucide-react";
import { Toggle } from "../ui/toggle";
type Props = {
  editor: Editor | null;
};
export const TooplTip = ({ editor }: Props) => {
  if (!editor) return null;
  return (
    <div className="text-neutral-black">
      <Toggle
        size={"sm"}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
        pressed={editor.isActive("heading")}
      >
        <Heading2 className="w-4 h-4 " />
      </Toggle>
      <Toggle
        size={"sm"}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
        pressed={editor.isActive("bold")}
      >
        <Bold className="w-4 h-4 " />
      </Toggle>
      <Toggle
        size={"sm"}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        pressed={editor.isActive("italic")}
      >
        <Italic className="w-4 h-4 " />
      </Toggle>
      <Toggle
        size={"sm"}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
        pressed={editor.isActive("strike")}
      >
        <Strikethrough className="w-4 h-4 " />
      </Toggle>
      <Toggle
        size={"sm"}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
        pressed={editor.isActive('bulletList')}
      >
        <List className="w-4 h-4 " />
      </Toggle>
      <Toggle
        size={"sm"}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
        pressed={editor.isActive('orderedList')}
      >
        <ListOrdered className="w-4 h-4 " />
      </Toggle>
    </div>
  )
}
