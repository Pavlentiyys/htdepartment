// Post.jsx
import React, { useState } from 'react';
import arrow from '../images/arrow_icon.svg';
import warning from '../images/warning_icon.svg';
import Report from './Report.jsx';
import Button from './button/Button.jsx';
import checkSvgPrimary from '../images/check_icon_primary.svg';
import checkSvgNormal from '../images/check_icon_normal.svg';
import EditPost from './EditPost';

export default function Post({ selectedArticle }) {
    const [isEditing, setIsEditing] = useState(false);

    // Функция для открытия модального окна и начала редактирования
    const startEditing = () => {
        setIsEditing(true);
    };

    // Функция для закрытия модального окна и завершения редактирования
    const stopEditing = () => {
        setIsEditing(false);
    };

    return (
        <main className='container mx-auto p-5'>
            <div className='flex-none lg:flex gap-10'>
                <img src={selectedArticle.article_image} className='rounded-xl my-2 w-full lg:w-1/2' alt="image" />
                <div className='p-2'>
                    <span className='text-xs lg:text-sm font-medium text-blue-600 uppercase'>{selectedArticle.article_status}</span>
                    <h2 className='text-xl lg:text-2xl font-medium min-w-1'>{selectedArticle.article_title}</h2>
                    <h3 className='text-lg lg:text-xl font-medium text-center mt-3'>Описание</h3>
                    <p className='opacity-60 my-4 text-sm md:text-md lg:text-lg'>{selectedArticle.article_text}</p>
                    <ul className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                        <li className='grid grid-cols-2 md:grid-cols-1'>
                            <span className='text-gray-500 text-sm md:text-md lg:text-lg'>Тип обращения</span>
                            <span className='text-sm md:text-md lg:text-lg'>{selectedArticle.article_type}</span>
                        </li>
                        <li className='grid grid-cols-2 md:grid-cols-1'>
                            <span className='text-gray-500 text-sm md:text-md lg:text-lg'>Дата публикации:</span>
                            <span className='text-sm md:text-md lg:text-lg'>{selectedArticle.article_date_published}</span>
                        </li>
                        <li className='grid grid-cols-2 md:grid-cols-1'>
                            <span className='text-gray-500 text-sm md:text-md lg:text-lg'>Город (район):</span>
                            <span className='text-sm md:text-md lg:text-lg'>{selectedArticle.article_city}</span>
                        </li>
                        <li className='grid grid-cols-2 md:grid-cols-1'>
                            <span className='text-gray-500 text-sm md:text-md lg:text-lg'>Адрес:</span>
                            <span className='text-sm md:text-md lg:text-lg'>{selectedArticle.article_adress}</span>
                        </li>
                        <li className='grid grid-cols-2 md:grid-cols-1'>
                            <span className='text-gray-500 text-sm md:text-md lg:text-lg'>Ответственная служба:</span>
                            <span className='text-sm md:text-md lg:text-lg'>{selectedArticle.article_responsible}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='md:flex flex-none justify-between gap-2 my-2 w-full'>
                <div className='w-full'>
                    {/* Кнопка "Редактировать" с функцией открытия модального окна */}
                    <Button onClick={startEditing}>Редактировать</Button>
                </div>
                <div className='w-full'>
                    <Button>Удалить</Button>
                </div>
            </div>
            <div>
                {/* Если статус выполнено: то показывает отчёт */}
                {selectedArticle.article_status === 'Выполнено' && <Report selectedArticle={selectedArticle} />}
                <div className='mt-6 p-3 rounded-3xl flex items-center justify-between max-w-full hover:bg-gray-200 cursor-pointer'>
                    <div className='flex items-center gap-5'>
                        <img src={selectedArticle.user_image} className='size-16 rounded-full' alt="user image" />
                        <h2 className='text-sm'>{selectedArticle.user_name}</h2>
                    </div>
                    <img src={arrow} alt="Arrow icon" />
                </div>
                {/* Если статус Необработанное то показывает кнопки */}
                {selectedArticle.article_status === 'Необработанное' && (
                    <section className='w-full'>
                        <div className='flex:none lg:flex justify-center gap-5'>
                            <div className='w-full lg:w-1/3'>
                                <Button color="Primary">Начать выполнение</Button>
                            </div>
                            <div className='w-full lg:w-1/3'>
                                <Button>Другой отдел</Button>
                            </div>
                        </div>
                    </section>
                )}
                {/* Если статус в работе */}
                {selectedArticle.article_status === 'В работе' && (
                    <section>
                        <div>
                            <div className='bg-[rgba(32,62,213,0.2)] my-5 p-3 gap-3 rounded-2xl flex items-center gap-2'>
                                <img src={warning} alt="warning" />
                                <ul>
                                    <li>Прошло дней - </li>
                                    <li>Осталось часов - </li>
                                    <li>Взял(-а) за работу - </li>
                                </ul>

                            </div>
                            <div className='flex:none lg:flex justify-center gap-5'>
                                <div className='w-full lg:w-1/3'>
                                    <Button color="Primary" icon={checkSvgPrimary}>Выполнить</Button>
                                </div>
                                <div className='w-full lg:w-1/3'>
                                    <Button>Продлить</Button>
                                </div>
                            </div>
                        </div>
                    </section>
                )}
            </div>

            {/* Модальное окно для редактирования */}
            {isEditing && (
                <div >
                    <EditPost stopEditing={stopEditing} />
                    {/* Импорт и использование компонента EditPost */}
                </div>
            )}
        </main>
    );
}
