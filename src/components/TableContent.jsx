import { useEffect, useState } from "react";
import "./TableContent.css";
import { getData } from "../api";

const colNames = ["TheTime", "NO", "NO2", "NOx", "O3 (ppb)", "CO (ppm)", "Device ID"];
const TableContent = (props) => {
  const {startTime, endTime, deviceID} = props;
  console.log(startTime, endTime, deviceID);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [sortedData, setSortedData] = useState([]);
  const [configPage, setConfigPage] = useState({});
  const [loading, setLoading] = useState(false);
  const recordsPerPage = 25;
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await getData(recordsPerPage, currentPage, startTime, endTime, deviceID);
      setSortedData(res.data);
      setConfigPage(res.meta);
      setLoading(false);
    }
    fetchData();
  }, [recordsPerPage, currentPage, startTime, endTime, deviceID]);
  const totalPages = configPage?.total_page;
  const maxPageNumberWindow = 5;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const pageNumbers = [];
  let startPage = Math.max(currentPage - (maxPageNumberWindow - 1) / 2, 1);
  let endPage = Math.min(startPage + maxPageNumberWindow - 1, totalPages);
  if (endPage - startPage + 1 < maxPageNumberWindow) {
    startPage = Math.max(endPage - maxPageNumberWindow + 1, 1);
  }
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  // useEffect(() => {
  //   let sortableData = sortedData;
  //   if (sortConfig.key) {
  //     sortableData.sort((a, b) => {
  //       if (a[sortConfig.key] < b[sortConfig.key]) {
  //         return sortConfig.direction === "ascending" ? -1 : 1;
  //       }
  //       if (a[sortConfig.key] > b[sortConfig.key]) {
  //         return sortConfig.direction === "ascending" ? 1 : -1;
  //       }
  //       return 0;
  //     });
  //   }
  //   setSortedData(sortableData);
  // }, [sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="mt-10 mx-10">
      <table className="min-w-full leading-normal shadow-md overflow-hidden">
        <thead>
          <tr>
            {colNames.map((colName, index) => (
              <th
                key={index}
                className="px-5 py-5 border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort(colName)}
              >
                <div className="flex justify-center">
                  {colName}
                  <svg
                    className="w-[10px] h-[10px] text-gray-800 ml-2 mt-[2px]"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5 5 1 1 5m0 6 4 4 4-4"
                    />
                  </svg>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr></tr>
          ) : 
          <>
            {sortedData.map((record) => (
                <tr key={record._id}>
                  <td className="text-center px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    {record.TheTime}
                  </td>
                  <td className="text-center px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    {record.NO.toFixed(5)}
                  </td>
                  <td className="text-center px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    {record.NO2.toFixed(5)}
                  </td>
                  <td className="text-center px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    {record.NOx.toFixed(5)}
                  </td>
                  <td className="text-center px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    {record["O3"].toFixed(5)}
                  </td>
                  <td className="text-center px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    {record["CO"].toFixed(5)}
                  </td>                
                  <td className="text-center px-5 py-2 border-b border-gray-200 bg-white text-sm">
                    {record["device_id"]}
                  </td>
                </tr>
              ))}
          </>
          }
        </tbody>
      </table>
      {loading && (
        <div className="py-8 font-bold justify-center text-center items-start shadow-md rounded-md">
          Loading...
        </div>
      )}
      {sortedData.length === 0 && !loading && (
        <div className="py-8 font-bold justify-center text-center items-start shadow-md rounded-md">
          No data found
        </div>
      )}
      <div className="flex justify-end my-4">
        <a
          href={`http://222.252.4.92:27016/data/download?from_date=${startTime}&to_date=${endTime}&device_id=${deviceID}`}
          download="sample_data.json"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex"
        >
          <svg
            className="w-[17px] h-[17px] text-white mt-[2px]"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 19"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 15h.01M4 12H2a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-3M9.5 1v10.93m4-3.93-4 4-4-4"
            />
          </svg>
          <div className="ml-2 flex items-center">Download Data</div>
        </a>
      </div>
      <div className="py-2 flex justify-center">
        <nav className="block">
          <ul className="flex pl-0 rounded list-none flex-wrap">
            {/* Previous Page Button */}
            <li className="page-item">
              <a
                onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                className={`page-link ${currentPage === 1 ? "disabled" : ""}`}
              >
                <svg
                  className="w-[17px] h-[17px] text-green-700"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 8 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13"
                  />
                </svg>
              </a>
            </li>

            {startPage > 1 && (
              <>
                <li className="page-item">
                  <a onClick={() => paginate(1)} className="page-link">
                    1
                  </a>
                </li>
                {startPage > 2 && (
                  <li className="page-item">
                    <a
                      onClick={() => paginate(startPage - 1)}
                      className="page-link"
                    >
                      ...
                    </a>
                  </li>
                )}
              </>
            )}
            {pageNumbers.map((number) => (
              <li
                key={number}
                className={`page-item ${
                  currentPage === number ? "active" : ""
                }`}
              >
                <a onClick={() => paginate(number)} className="page-link">
                  {number}
                </a>
              </li>
            ))}
            {endPage < totalPages && (
              <>
                {endPage < totalPages - 1 && (
                  <li className="page-item">
                    <a
                      onClick={() => paginate(endPage + 1)}
                      className="page-link"
                    >
                      ...
                    </a>
                  </li>
                )}
                <li className="page-item">
                  <a onClick={() => paginate(totalPages)} className="page-link">
                    {totalPages}
                  </a>
                </li>
              </>
            )}

            {/* Next Page Button */}
            <li className="page-item">
              <a
                onClick={() =>
                  currentPage < totalPages && paginate(currentPage + 1)
                }
                className={`page-link ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
              >
                <svg
                  className="w-[17px] h-[17px] text-green-700e"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 8 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"
                  />
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
