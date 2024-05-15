'use client';

import { Editor } from '@tiptap/react';
import {
  Bold,
  Heading2,
  Italic,
  List,
  ListOrdered,
  Strikethrough,
} from 'lucide-react';

import { Toggle } from '@/components/ui/toggle';

interface Props {
  editor: Editor | null;
}

export function Toolbar({ editor }: Props) {
  if (!editor) {
    return null;
  }

  return (
    <div className='border border-input bg-transparent rounded'>
      <Toggle
        size='sm'
        pressed={editor.isActive('heading')}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
      >
        <Heading2 className='w-4 h-4' />
      </Toggle>
      <Toggle
        size='sm'
        pressed={editor.isActive('bold')}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className='w-4 h-4' />
      </Toggle>
      <Toggle
        size='sm'
        pressed={editor.isActive('italic')}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className='w-4 h-4' />
      </Toggle>
      <Toggle
        size='sm'
        pressed={editor.isActive('strike')}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className='w-4 h-4' />
      </Toggle>
      <Toggle
        size='sm'
        pressed={editor.isActive('bulletList')}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className='w-4 h-4' />
      </Toggle>
      <Toggle
        size='sm'
        pressed={editor.isActive('orderedList')}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className='w-4 h-4' />
      </Toggle>
    </div>
  );
}
