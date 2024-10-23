import React from 'react';

const TextInput = ({
  label,
  id,
  value,
  onChange,
  placeholder = '',
  required = false,
}) => {
  return (
    <div className="mb-5 max-w-[80%]">
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <input
        type="text"
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      />
    </div>
  );
};

export default TextInput;
