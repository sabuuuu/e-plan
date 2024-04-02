import React, { useState } from 'react';

const Combobox = ({ options, selectedValue, onChange }) => {
  const [selected, setSelected] = useState(selectedValue); 

  
  const handleChange = (event) => {
    setSelected(event.target.value);
    onChange(event.target.value);
  };

  return (
    <select
        value={selected}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-md px-4 py-2"
        >
        {options.map((option) => (
            <option
            key={option.value}
            value={option.value}
            className="bg-white text-gray-800"
            >
            {option.label}
            </option>
        ))}
    </select>
  );
};

export default Combobox; 