import React, { useState } from 'react';
import Input from './input/Input';
import Button from './button/Button';

export default function EditPost({ stopEditing }) {
    const [isModalOpen, setIsModalOpen] = useState(true);

    // Функция для закрытия модального окна редактирования
    const closeModal = () => {
        setIsModalOpen(false);
        stopEditing(); // Вызываем функцию stopEditing переданную из компонента Post
    };

    // Функция для предотвращения закрытия модального окна при клике внутри контента
    const preventClosing = (event) => {
        event.stopPropagation();
    };

    return (
        <section>
            {isModalOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto" onClick={closeModal}>
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        {/* Слой затемнения */}
                        <div className="fixed inset-0 transition-opacity">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        {/* Содержимое модального окна */}
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" onClick={preventClosing}>
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div>
                                    <div className="mt-3 text-center sm:mt-0 sm:text-left">
                                        {/* Закрыть модальное окно */}
                                        <button onClick={closeModal} className="absolute top-0 right-0 mt-4 mr-4">
                                            <span className="sr-only">Закрыть</span>
                                            <svg className="h-6 w-6 fill-current text-gray-500 hover:text-gray-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 0c5.523 0 10 4.477 10 10s-4.477 10-10 10S0 15.523 0 10 4.477 0 10 0zm5.707 14.293a1 1 0 0 1-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 1 1-1.414-1.414L8.586 10 4.293 5.707a1 1 0 0 1 1.414-1.414L10 8.586l4.293-4.293a1 1 0 0 1 1.414 1.414L11.414 10l4.293 4.293z" clipRule="evenodd" /></svg>
                                        </button>
                                        <div className='w-full'>
                                            <Input>Название</Input>
                                            <Input type="image">Изображение</Input>
                                            <Input type="image">Изображение 2</Input>
                                            <Input type="image">Изображение 3</Input>
                                            <Input type="file">Видео</Input>
                                            <Input>Описание</Input>
                                            <Input>Адрес</Input>
                                            <Input isRequired={true}>Тип обращения</Input>
                                        </div>
                                        <div className='flex:none md:flex justify-start gap-5'>
                                            <div className='w-full'>
                                                <Button onClick={closeModal} color="Primary">Готово</Button>
                                            </div>
                                            <div className='w-full'>
                                                <Button onClick={closeModal}>Отмена</Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
