import { useMemo, useState } from 'react';
import "./TableContent.css";

const colNames = ['TheTime', 'NO', 'NO2', 'NOx', 'O3 (ppb)', 'CO (ppm)'];
const TableContent = ({ data }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    const recordsPerPage = 5;
    const totalPages = Math.ceil(data.length / recordsPerPage);
    const maxPageNumberWindow = 5;

    const paginate = pageNumber => setCurrentPage(pageNumber);
    const pageNumbers = [];
    let startPage = Math.max(currentPage - (maxPageNumberWindow - 1) / 2, 1);
    let endPage = Math.min(startPage + maxPageNumberWindow - 1, totalPages);
    if (endPage - startPage + 1 < maxPageNumberWindow) {
        startPage = Math.max(endPage - maxPageNumberWindow + 1, 1);
    }
    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    const sortedData = useMemo(() => {
        let sortableData = [...data];
        if (sortConfig.key) {
            sortableData.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableData;
    }, [data, sortConfig]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    return (
        <div className='m-20'>
            <table className="min-w-full leading-normal shadow-md overflow-hidden">
                <thead>
                    <tr>
                        {
                            colNames.map((colName, index) => (
                                <th
                                    key={index}
                                    className="px-5 py-5 border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer"
                                    onClick={() => requestSort(colName)}
                                >
                                    <div className='flex justify-center'>
                                        {colName}
                                        <svg className="w-[10px] h-[10px] text-gray-800 ml-2 mt-[2px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 16">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5m0 6 4 4 4-4" />
                                        </svg>
                                    </div>
                                </th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {sortedData
                        .slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage)
                        .map((record, index) => (
                            <tr key={index}>
                                <td className="text-center px-5 py-5 border-b border-gray-200 bg-white text-sm" >{record.TheTime}</td>
                                <td className="text-center px-5 py-5 border-b border-gray-200 bg-white text-sm" >{record.NO}</td>
                                <td className="text-center px-5 py-5 border-b border-gray-200 bg-white text-sm" >{record.NO2}</td>
                                <td className="text-center px-5 py-5 border-b border-gray-200 bg-white text-sm" >{record.NOx}</td>
                                <td className="text-center px-5 py-5 border-b border-gray-200 bg-white text-sm" >{record['O3 (ppb)']}</td>
                                <td className="text-center px-5 py-5 border-b border-gray-200 bg-white text-sm" >{record['CO (ppm)']}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
            <div className='flex justify-end my-4'>
                <a href="../pages/sample_data.json" download="sample_data.json" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex">
                    <svg className="w-[17px] h-[17px] text-white mt-[2px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 19">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15h.01M4 12H2a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-3M9.5 1v10.93m4-3.93-4 4-4-4" />
                    </svg>
                    <div className='ml-2 flex items-center'>Download Data</div>
                </a>
            </div>
            <div className="py-2 flex justify-center">
                <nav className="block">
                    <ul className="flex pl-0 rounded list-none flex-wrap">
                        {/* Previous Page Button */}
                        <li className="page-item">
                            <a
                                onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                                className={`page-link ${currentPage === 1 ? 'disabled' : ''}`}
                            >
                                <svg className="w-[17px] h-[17px] text-green-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13" />
                                </svg>
                            </a>
                        </li>

                        {startPage > 1 && (
                            <>
                                <li className="page-item">
                                    <a onClick={() => paginate(1)} className="page-link">1</a>
                                </li>
                                {startPage > 2 && <li className="page-item">
                                    <a onClick={() => paginate(startPage - 1)} className="page-link">...</a>
                                </li>}
                            </>
                        )}
                        {pageNumbers.map(number => (
                            <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                                <a onClick={() => paginate(number)} className="page-link">
                                    {number}
                                </a>
                            </li>
                        ))}
                        {endPage < totalPages && (
                            <>
                                {endPage < totalPages - 1 && <li className="page-item">
                                    <a onClick={() => paginate(endPage + 1)} className="page-link">...</a>
                                </li>}
                                <li className="page-item">
                                    <a onClick={() => paginate(totalPages)} className="page-link">{totalPages}</a>
                                </li>
                            </>
                        )}

                        {/* Next Page Button */}
                        <li className="page-item">
                            <a
                                onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
                                className={`page-link ${currentPage === totalPages ? 'disabled' : ''}`}
                            >
                                <svg className="w-[17px] h-[17px] text-green-700e" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1" />
                                </svg>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>

        </div>
    );
};

export default TableContent;
