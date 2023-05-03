import React from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import { Link, useNavigate } from "react-router-dom";

export default function DataTable({ columns, tableData, isLoading }) {
  const navigate = useNavigate();

  const {
    // isLoading,
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow,
  } = useTable({ columns, data: tableData }, useSortBy, usePagination);
  const { pageIndex, pageSize } = state;
  console.log(isLoading);
  return (
    <div className="card overflow-scroll ">
      {isLoading && (
        <div className="d-flex justify-content-center mt-2">
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      )}
      {!isLoading && (
        <table {...getTableProps()} className="datatables-basic table">
          <thead>
            {headerGroups.map((headerGroup, index) => (
              <tr key={index} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => {
                  return (
                    <th
                      key={column.Header}
                      className={
                        column.Header == "Action" ? "text-lg-center" : ""
                      }
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      {column.render("Header")}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? " ↑"
                            : " ↓"
                          : ""}
                      </span>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {tableData.length ? (
              <>
                {page.map((row) => {
                  prepareRow(row);
                  return (
                    <tr key={row?.original?.id} {...row.getRowProps()}>
                      {row.cells.map((cell, index) => {
                        return (
                          <>
                            {" "}
                            {cell?.column?.id == "action" ? (
                              <td
                                key={index}
                                className="d-flex justify-content-center"
                              >
                                {cell?.row?.original?.action}
                              </td>
                            ) : (
                              <td key={index} {...cell.getCellProps()}>
                                {cell.render("Cell")}
                              </td>
                            )}
                          </>
                        );
                      })}
                    </tr>
                  );
                })}
              </>
            ) : (
              <tr className="h6 text-center">
                <td colSpan={columns.length}>No Data Found</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
      {tableData?.length > 9 && (
        <div className="border-top d-flex justify-content-between px-5 pt-3">
          <div>
            <span className="font-medium-2">
              Page <strong>{pageIndex + 1}</strong> of{" "}
              <strong>{pageOptions.length}</strong>{" "}
            </span>
            <select
              className="form-control-sm mx-1"
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              {[10, 25, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button
              className="btn btn-outline-secondary btn-sm mx-2"
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            >
              {"<<"}
            </button>
            <button
              className="btn btn-outline-secondary btn-sm mx-2"
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              Previous
            </button>
            <span className="p-3 text-bold">{pageIndex + 1}</span>
            <button
              className="btn btn-outline-secondary btn-sm mx-2"
              onClick={() => nextPage()}
              disabled={!canNextPage}
            >
              Next
            </button>
            <button
              className="btn btn-outline-secondary btn-sm mx-2"
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {">>"}
            </button>
          </div>
        </div>
      )}
      <br />
    </div>
  );
}
