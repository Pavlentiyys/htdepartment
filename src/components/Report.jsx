import warning from '../images/warning_icon.svg';

export default function Report({selectedArticle}) {
    return (
        
        <section className=' my-6'>
            <hr className="border-t border-gray-300 my-4" />
                <div className='flex:none lg:flex flex-row-reverse gap-10'>
                    <div>
                        <h2 className='text-lg md:text-xl lg:text-2xl  font-medium my-1'>Отчёт от отдела</h2>
                        <p className='text-sm md:text-md lg:text-lg opacity-65 mb-5' >{selectedArticle.department_report}</p>
                    </div>
                    <img src={selectedArticle.department_report_image} className='rounded-xl w-full lg:w-1/2' alt="Department report image" />
                </div>
                <div className='bg-[rgba(32,62,213,0.2)] my-5 p-3 rounded-2xl flex items-center gap-2'>
                    <img src={warning} alt="warning" />
                    <p>Оценка - {selectedArticle.department_report_rate}</p>
                </div>
        </section>
    )
}