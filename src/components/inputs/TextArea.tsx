import React from 'react';

type TextAreaProps = {
  label?: string;
  error?: string;
} & React.ComponentPropsWithRef<'textarea'>;

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, rows, ...rest }, ref) => {
    return (
      <>
        {label ? (
          <label
            htmlFor='message'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            {label}
          </label>
        ) : null}
        <textarea
          rows={rows ? rows : 4}
          className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-600 focus:border-primary-600'
        ></textarea>
      </>
    );
  }
);

export default TextArea;
