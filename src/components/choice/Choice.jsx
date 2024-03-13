import React, { useState } from 'react';

export default function Dropdown({ children, onAddItem }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const department = [
    { id: 1, name: 'Отдел 1', image: 'image1.jpg' },
    { id: 2, name: 'Отдел 2', image: 'image2.jpg' },
    { id: 3, name: 'Отдел 3', image: 'image3.jpg' },
    { id: 4, name: 'Отдел 4', image: 'image4.jpg' },
    { id: 5, name: 'Отдел 5', image: 'image5.jpg' }
  ];

  const filteredItems = department.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectItem = item => {
    setSelectedItem(item);
    setSearchTerm('');
    setIsOpen(false);
  };

  const handleInputChange = event => {
    const inputText = event.target.value;
    setSearchTerm(inputText);
    setSelectedItem(null);

    if (inputText === '') {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  const handleAddItem = () => {
    if (searchTerm.trim() !== '' && !department.find(item => item.name.toLowerCase() === searchTerm.toLowerCase())) {
      onAddItem(searchTerm);
      setSearchTerm('');
      setIsOpen(false);
    }
  };

  return (
    <div className="relative">
      <label htmlFor="choice" className='font-medium'>{children}</label>
      <input
        type="text"
        id='choice'
        value={selectedItem ? selectedItem.name : searchTerm}
        onChange={handleInputChange}
        onClick={() => setIsOpen(!isOpen)}
        className="border border-gray-300 rounded px-3 py-2 my- w-full"
        placeholder="Выбор..."
      />
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded shadow-md">
          {filteredItems.map((item, index) => (
            <div
              key={index}
              onClick={() => handleSelectItem(item)}
              className="cursor-pointer px-3 py-2 hover:bg-gray-100 flex items-center"
            >
              <img src={item.image} alt={item.name} className="w-8 h-8 mr-2 rounded-full" />
              <span>{item.name}</span>
            </div>
          ))}
          {searchTerm.trim() !== '' && (
            <div
              onClick={handleAddItem}
              className="cursor-pointer px-3 py-2 hover:bg-gray-100 flex items-center"
            >
              <span className="text-blue-600">Добавить "{searchTerm}"</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
