import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

import Spinner from '@/components/loading/spinner';

type MultipleSelectProps = {
  loading?: boolean;
  values: any[];
  value: string;
  placeholder?: string;
  setInput: Dispatch<SetStateAction<any>>;
  onChange: (value: any[]) => void;
};

type SelectProps = {
  options: any[];
} & MultipleSelectProps;

export function Select({
  loading,
  values,
  value,
  onChange,
  setInput,
  options,
  placeholder,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  function clearOptions() {
    onChange([]);
  }

  function selectOption(option: any) {
    setInput('');
    onChange([...values, option]);
    setIsOpen(false);
  }

  const deleteOptiton = (id: string | number) => {
    const data = values.filter((permisson) => permisson.id !== id);
    onChange(data);
  };

  function isOptionSelected(option: any) {
    return values.includes(option);
  }

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target != containerRef.current) return;
      switch (e.code) {
        case 'Enter':
        case 'Space':
          setIsOpen((prev) => !prev);
          break;
        case 'ArrowUp':
        case 'ArrowDown': {
          if (!isOpen) {
            setIsOpen(true);
            break;
          }
          break;
        }
        case 'Escape':
          setIsOpen(false);
          break;
      }
    };
    containerRef.current?.addEventListener('keydown', handler);

    return () => {
      containerRef.current?.removeEventListener('keydown', handler);
    };
  }, [isOpen, options]);

  return (
    <div>
      <div
        ref={containerRef}
        onBlur={() => setIsOpen(false)}
        tabIndex={0}
        className={`relative w-full bg-gray-50 min-h-6 border border-gray-300 text-gray-900 sm:text-sm rounded-lg flex items-center gap-2 p-2 outline-none ${
          isOpen ? 'border-primary-600 ring-primary-600 border-2' : ''
        }`}
      >
        <span className='flex-grow flex gap-2 flex-wrap'>
          {values.map((v) => (
            <button
              key={v.id}
              onClick={(e) => {
                e.stopPropagation();
                deleteOptiton(v.id);
              }}
              className='flex items-center border border-gray-300 rounded px-2 py-1 gap-1 cursor-pointer hover:bg-gray-100 focus:bg-gray-100 focus:border-primary-600 focus:border-2'
            >
              {v.name}
              <span className='text-red-500'>&times;</span>
            </button>
          ))}
          <input
            onFocus={() => setIsOpen(true)}
            onChange={(e) => setInput(e.target.value)}
            value={value}
            placeholder={placeholder}
            className='grid-cols-3 outline-none min-w-2/3 border-none focus:outline-none focus:border-none bg-transparent focus:ring-0'
          />
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            clearOptions();
          }}
          className='text-red-500 bg-none border-none outline-none cursor-pointer p-0'
        >
          &times;
        </button>
        <ul className='absolute top-full shadow-md w-full max-h-60 overflow-y-auto border-gray-300 rounded bg-white z-10'>
          {loading ? (
            <div className='text-center py-10'>
              <Spinner />
            </div>
          ) : (
            options
              .filter((item) => {
                const searchTerm = (value as string).toLowerCase();
                const permissionName = item.name.toLowerCase();
                return searchTerm && permissionName.includes(searchTerm);
              })
              .slice(0, 10)
              .map((option) => {
                const index = values.findIndex((user) => user.id === option.id);
                if (index === -1) {
                  return (
                    <li
                      onClick={(e) => {
                        e.stopPropagation();
                        selectOption(option);
                      }}
                      key={option.name}
                      className={`px-2 py-1 cursor-pointer hover:bg-primary-600 hover:text-white ${
                        isOptionSelected(option) ? 'bg-blue-200' : ''
                      }`}
                    >
                      {option.name}
                    </li>
                  );
                }
              })
          )}
        </ul>
      </div>
    </div>
  );
}
