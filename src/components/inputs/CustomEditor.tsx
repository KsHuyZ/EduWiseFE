import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import React from 'react';

const editorConfiguration = {
  toolbar: [
    'heading',
    '|',
    'bold',
    'italic',
    'link',
    'bulletedList',
    'numberedList',
    '|',
    'outdent',
    'indent',
    '|',
    'imageUpload',
    'blockQuote',
    'insertTable',
    'mediaEmbed',
    'undo',
    'redo',
  ],
  width: '75%',
};

interface CKEditorProps {
  label?: string;
  value?: string;
  onChange: ((event: any, editor: ClassicEditor) => void) | undefined;
}

function CustomEditor({ label, value, onChange }: CKEditorProps) {
  return (
    <div>
      {label ? (
        <label className='block text-sm mb-2 font-medium text-gray-900 dark:text-white'>
          {label}
        </label>
      ) : null}
      <CKEditor
        editor={ClassicEditor}
        config={editorConfiguration}
        onChange={onChange}
        data={value}
      />
    </div>
  );
}

export default CustomEditor;
