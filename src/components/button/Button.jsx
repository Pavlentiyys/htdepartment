import React from 'react';

export default function Button({ children, typeButton, onClick, hidden, icon, color }) {
    // Определение классов в зависимости от переданного цвета
    const buttonColorClass = color === 'Primary' ? 'bg-blue-600 text-white border-2 border-blue-600' : 'bg-white border-2 border-gray-300';
    // Определение цвета для изображения
    const iconColor = color === 'Primary' ? '#ffffff' : '#000000';

    return (
        <div>
            <button type={typeButton} onClick={onClick} hidden={hidden} className={`font-medium w-full flex justify-center p-2 my-2 rounded-lg ${buttonColorClass}`}>
                {icon && <img src={icon} alt="icon" className="w-6 h-6 mr-2" style={{ fill: iconColor }} />}
                {children}
            </button>
        </div>
    )
}
