// Post.jsx
import React, { useState } from 'react';
import arrow from '../images/arrow_icon.svg';
import warning from '../images/warning_icon.svg';
import Report from './Report.jsx';
import Button from './button/Button.jsx';
import checkSvgPrimary from '../images/check_icon_primary.svg';
import checkSvgNormal from '../images/check_icon_normal.svg';
import Dropdown from './choice/Choice.jsx';
import EditPost from './EditPost';
import Input from './input/Input.jsx';

export default function Post({ selectedArticle }) {
    const [isEditing, setIsEditing] = useState(false);
    const [isExtending, setIsExtending] = useState(false);
    const [isSelectingDepartment, setIsSelectingDepartment] = useState(false);
    const [isExecuting, setIsExecuting] = useState(false); // Добавленное состояние

    const startEditing = () => {
        setIsEditing(true);
    };

    const stopEditing = () => {
        setIsEditing(false);
    };

    const startExtending = () => {
        setIsExtending(true);
    };

    const stopExtending = () => {
        setIsExtending(false);
    };

    const startSelectingDepartment = () => {
        setIsSelectingDepartment(true);
    };

    const stopSelectingDepartment = () => {
        setIsSelectingDepartment(false);
    };

    const startExecuting = () => {
        setIsExecuting(true); // Функция для начала выполнения
    };

    const stopExecuting = () => {
        setIsExecuting(false); 
    };

    return (
        <main className='container mx-auto p-5'>
            {/* Пост с обращением */}
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
                    <div className='flex-col gap-2 my-5 w-full'>
                        <div className='w-full'>
                            <Button onClick={startEditing}>Редактировать</Button>
                        </div>
                        <div className='w-full'>
                            <Button>Удалить</Button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Кнопка редактировать и удалить */}
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
                                <Button onClick={startSelectingDepartment}>Другой отдел</Button>
                            </div>
                        </div>
                    </section>
                )}

                {/* Модальное окно для выбора другого отдела */}
                {isSelectingDepartment && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white p-4 md:p-8 rounded-lg w-96 md:w-2/3 max-w-lg">
                            <h2 className="text-lg md:text-xl font-semibold mb-4">Выберите другой отдел</h2>
                            <Dropdown>Отдел</Dropdown>
                            <div className="flex-none md:flex justify-end gap-3 mt-4">
                                <div className='w-full'>
                                    <Button color="Primary" onClick={stopSelectingDepartment}>Выбрать</Button>
                                </div>
                                <div className='w-full'>
                                    <Button onClick={stopSelectingDepartment}>Отмена</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
               

                {/* Если статус в работе выдаёт информацию о прохождении работы*/}
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
                                    <Button color="Primary" onClick={startExecuting} icon={checkSvgPrimary}>Выполнить</Button>
                                </div>
                                <div className='w-full lg:w-1/3'>
                                    <Button onClick={startExtending}>Продлить</Button>
                                </div>
                            </div>
                        </div>
                    </section>
                )}
                {/* По нажатию кнопки выполнить появляется модальное окно с добавлением фотоотчёта */}
                <section>

                    {isExecuting && (
                        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                            <div className="bg-white p-4 md:p-8 rounded-lg w-96 md:w-2/3 max-w-lg">
                                <h2 className="text-lg md:text-xl font-semibold mb-4">Выполнить задачу</h2>
                                <Input type="image"><span className='font-medium'>Фотоотчёт</span></Input>
                                <div className="flex:none md:flex justify-end gap-3 mt-4">
                                    <div className='w-full'>
                                        <Button color="Primary" onClick={stopExecuting}>Подтвердить</Button>
                                    </div>
                                    <div className='w-full'>
                                        <Button onClick={stopExecuting}>Отмена</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </section>
                {/* Модальное окно продления работы*/}
                <section>
                {isExtending && (
                            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                                <div className="bg-white p-4 md:p-8 rounded-lg w-96 md:w-2/3 max-w-lg">
                                <h2 className="text-lg md:text-xl font-semibold mb-4">Продлить</h2>
                                <input
                                    type="date"
                                    className="border border-gray-300 px-4 py-2 rounded-lg w-full"
                                />
                                <div className="flex:none md:flex justify-end gap-3 mt-4">
                                    <div className='w-full'>
                                        <Button onClick={stopExtending}>Отмена</Button>
                                    </div>
                                    <div className='w-full'>
                                        <Button color="Primary" onClick={stopExtending}>Продлить</Button>
                                    </div>
                                </div>
                            </div>
                            </div>
                        )}
                </section>
            </div>

            {/* Модальное окно для редактирования */}
            {isEditing && (
                <div >
                    <EditPost stopEditing={stopEditing} />
                   
                </div>
            )}
        </main>
    );
}
