import React, { useState } from 'react';
import { article } from '../data.js'; // Предполагаем, что у вас есть переменная article, хранящая данные о статье
import Post from './Post.jsx';
import warning from '../images/warning_icon.svg';
import search from '../images/search_icon.svg';
import filter from '../images/filter_icon.svg';
import arrow from '../images/arrow_icon.svg';
import arrowBottom from '../images/arrow_bottom_icon.svg';

export default function Articles() {
    const [searchText, setSearchText] = useState('');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filters, setFilters] = useState({
        inProgress: false,
        underReview: false,
        notProcessed: false
    });
    const [selectedArticle, setSelectedArticle] = useState(null);

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };

    const toggleFilter = () => {
        setIsFilterOpen(!isFilterOpen);
    };

    const handleFilterChange = (event) => {
        const { name, checked } = event.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: checked
        }));
    };

    const clearFilters = () => {
        setFilters({
            inProgress: false,
            underReview: false,
            notProcessed: false
        });
    };

    const applyFilters = () => {
        toggleFilter(); // Закрыть модальное окно после применения фильтров
    };

    const openPost = (selectedArticle) => {
        setSelectedArticle(selectedArticle);
    };

    const closePost = () => {
        setSelectedArticle(null);
    };

    // Фильтрация данных
    const filteredData = article.filter(article => {
        const isMatchingStatus = 
            (!filters.inProgress || article.article_status === 'В работе') &&
            (!filters.underReview || article.article_status === 'На проверке') &&
            (!filters.notProcessed || article.article_status === 'Необработанное');
        
        const isMatchingSearch = article.article_title.toLowerCase().includes(searchText.toLowerCase());
        
        return isMatchingStatus && isMatchingSearch;
    });

    return (
        <main className='container mx-auto w-4/5'>
            
            {/* Информация о странице */}
            <section className='bg-[rgba(32,62,213,0.2)] my-5 p-3 rounded-2xl flex items-center gap-2'>
                <img src={warning} alt="warning" />
                <p>Здесь выводятся обращения к вашему отделу.</p>
            </section>
            {/* Информация о странице */}

            {/* Название отделения */}
            <section className='flex-none md:flex justify-between my-8 items-center'>
                <h2 className='font-bold text-xl lg:text-2xl my-2'>Полиция Г. Аксу</h2>
            {/* Название отделения */}

            {/* Поиск */}
                <div className='flex'>
                    <div className='flex items-center p-2 rounded-xl bg-gray-300 opacity-65 mr-2 w-full'>
                        <label htmlFor="searchPost">
                            <img src={search} alt="search" />
                        </label>
                        <input 
                            id="searchPost" 
                            type="text" 
                            className='mx-2 w-full lg:w-96 bg-gray-300 outline-none placeholder:opacity-65 text-black' 
                            placeholder='Поиск' 
                            onChange={handleSearchChange} 
                            value={searchText} 
                        />
                    </div>
                {/* Поиск */}
                
                    {/* Кнопка фильтр */}
                    <div className='flex text-left px-4 gap-2 rounded-xl bg-gray-300 opacity-65 lg:w-full lg:h-full'>
                        <button className='flex items-center justify-between w-full' onClick={toggleFilter}>
                            <div className='flex items-center gap-1 h-10'>
                                <img src={filter} alt="filter" />
                                <span className='hidden lg:flex'>Фильтр</span>
                            </div>
                            <div className='hidden lg:flex'>
                                <img src={arrowBottom} alt="arrow" />
                            </div>
                        </button>
                    </div>
                    {/* Кнопка фильтр */}
                </div>
            </section>
        
            {/* Выпадающий фильтр */}
            {isFilterOpen && (
                <div className=" absolute right-20 lg:right-48 w-60 origin-top-right bg-white divide-y divide-gray-100 rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 p-5">
                    <div className="flex justify-between my-2 pr-2">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Фильтры</h3>
                        <img src={arrowBottom} alt="" />
                    </div>
                    <div className="py-1">
                        {/* Код фильтров */}
                        <div className="flex flex-row-reverse items-center justify-between mb-4">
                            <input
                                id="inProgress"
                                type="checkbox"
                                name="inProgress"
                                checked={filters.inProgress}
                                onChange={handleFilterChange}
                                className="mr-2"
                            />
                            <label htmlFor="inProgress">В работе</label>
                        </div>
                        <div className="flex flex-row-reverse items-center justify-between mb-4">
                            <input
                                id="underReview"
                                type="checkbox"
                                name="underReview"
                                checked={filters.underReview}
                                onChange={handleFilterChange}
                                className="mr-2"
                            />
                            <label htmlFor="underReview">На проверке</label>
                        </div>
                        <div className="flex flex-row-reverse items-center justify-between mb-4">
                            <input
                                id="notProcessed"
                                type="checkbox"
                                name="notProcessed"
                                checked={filters.notProcessed}
                                onChange={handleFilterChange}
                                className="mr-2"
                            />
                            <label htmlFor="notProcessed">Необработанное</label>
                        </div>
                        <div className="flex justify-between ">
                            <button className="text-blue-600 border-2 border-blue-600 p-2 rounded-xl" onClick={clearFilters}>Очистить</button>
                            <button className="text-white bg-blue-600 border-2 border-blue-600 p-2 rounded-xl" onClick={applyFilters}>Готово</button>
                        </div>
                    </div>
                </div>
            )}
            {/* Выпадающий фильтр */}
            
            
            {selectedArticle && (
            <div className="fixed inset-0 z-10 overflow-y-auto bg-white">
                <div className=" bg-white px-4 py-5 sm:px-6">
                    <button className='text-blue-600 text-medium' onClick={closePost}>Вернуться</button>
                    <Post selectedArticle={selectedArticle}/>
                    
                </div>
            </div>
            )}
            
            
            <section>
                <div>
                    {/* Статьи */}
                    {filteredData.filter(article => article.article_status !== 'Выполнено').filter(article => article.article_responsible === 'Полиция Г. Аксу').slice(0, 5).map((article, index) => (
                        <div className='flex justify-between items-center my-5 cursor-pointer' key={index} onClick={() => openPost(article)}>
                            <div className='flex'>
                                <img src={article.article_image} alt="article image" className='w-36 rounded-xl'/>
                                <div className='px-2'>
                                    <p className='text-blue-600 font-medium sm:text-base md:text-lx text-lg'>{article.article_status}</p>
                                    <h4 className='font-bold md:text-xl text-lg'>{article.article_title}</h4>
                                    <date className="text-gray-500 z-index-0">{article.article_date_published}</date>
                                </div>
                            </div>
                            <div>
                                <img src={arrow} alt="arrow" />
                            </div>
                        </div>
                    ))}
                    {/* Статьи */}
                </div>
            </section>
            
            <section>
                <div>
                    <div>
                        <h2 className='font-bold text-xl lg:text-2xl'>Выполненные</h2>
                    </div>
                    {article.filter(article => article.article_status === 'Выполнено').filter(article => article.article_responsible === 'Полиция Г. Аксу').slice(0, 5).map((article, index) => (
                        <div className='flex justify-between items-center my-5 cursor-pointer' key={index} onClick={() => openPost(article)}>
                            <div className='flex'>
                                <img src={article.article_image} alt="article image" className='w-36 rounded-xl'/>
                                <div className='px-2'>
                                    <p className='text-blue-600 font-medium sm:text-base md:text-lx text-lg'>{article.article_status}</p>
                                    <h4 className='font-bold md:text-xl text-lg'>{article.article_title}</h4>
                                    <date className="text-gray-500 z-index-0">{article.article_date_published}</date>
                                </div>
                            </div>
                            <div>
                                <img src={arrow} alt="arrow" />
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
