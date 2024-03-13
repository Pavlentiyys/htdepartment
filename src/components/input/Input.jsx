import React, { useState } from 'react';
import imageSvg from '../../images/image_icon.svg'; // Импорт изображения

export default function Input({ children, type, disabled, initialValue, placeholder, isRequired }) {
    const [value, setValue] = useState(initialValue);

    const handleChange = (event) => {
        const inputValue = event.target.value;
        setValue(inputValue);
    };

    return (
        <div>
            <label htmlFor="textInput" className='flex justify-between' placeholder={placeholder}>
                {children}
                {isRequired && <span className="text-gray-500 italic">Обязательно</span>}
            </label>
            {type === 'file' || type === 'image' ? (
                <div>
                    <label htmlFor={type === 'file' ? 'fileInput' : 'imageInput'} className='w-full py-2 px-2 my-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none flex items-center cursor-pointer'>
                        <img src={type === 'image' ? imageSvg : imageSvg} className='w-6 h-6 mr-2' alt='Image' /> 
                        <span className='text-gray-600'>{type === 'file' ? 'Выберите файл' : 'Добавьте фото'}</span>
                        <input type='file' id={type === 'file' ? 'fileInput' : 'imageInput'} accept={type === 'image' ? 'image/*' : ''} className='hidden' onChange={handleChange} disabled={disabled} />
                    </label>
                </div>
            ) : (
                <input type={type} id='textInput' className='w-full py-2 px-2 my-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none' value={value} onChange={handleChange} placeholder={placeholder} disabled={disabled} />
            )}
        </div>
    );
}
