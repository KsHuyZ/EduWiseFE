'use client';
import Heading from '@tiptap/extension-heading';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React, { useEffect } from 'react';

import { Toolbar } from '@/components/Toolbar';

interface TiptapProps {
  value: string;
  onChange: (text: string) => void;
}

const Tiptap = ({ value, onChange }: TiptapProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({}),
      Heading.configure({
        HTMLAttributes: {
          class: 'text-xl font-bold',
          levels: [2],
        },
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class:
          'rounded-md border min-h-[150px] border-input bg-back bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 outline-primary-600 block w-full p-2.5',
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (value) {
      editor?.commands.setContent(value);
    }
  }, [value]);

  return (
    <div className='flex flex-col justify-stretch min-h-[150px]'>
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
