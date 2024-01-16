//"use strict";
"use client";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import data from "../../../data/MOCK_DATA.json";
import * as React from "react";
import { useMemo, useState } from "react";

import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

type Person = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  model_car: string;
};

const defaultData: Person[] = [...data];

const columnHelper = createColumnHelper<Person>();

/////COLUMNS
const columns = [
  columnHelper.accessor("first_name", {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.last_name, {
    id: "last_name",
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Last Name</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("email", {
    header: () => "MAIL",
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("gender", {
    header: () => <span>Visits</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("model_car", {
    header: "Status",
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor(`model_car`, {
    header: "actions",
    ///btn update and delete
    cell: (info) => (
      <>
        <button
          className="btn btn-circle btn-error m-1"
          onClick={() => {
            alert("delete" + info.row.original.id);
          }}
        >
          <MdDeleteForever className="h-6 w-6 " />
        </button>
        <button
          className="btn btn-circle btn-success m-1"
          onClick={() => {
            alert("update" + info.row.original.id);
          }}
        >
          <FaEdit className="h-6 w-6" />
        </button>
      </>
    ),

    footer: (info) => info.column.id,
  }),
];

////component order
const Order = () => {
  const [data, setData] = useState(() => [...defaultData]);
  //const rerender = React.useReducer(() => ({}), {})[1];
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  /////table
  React.useEffect(() => {
    if (data.length > 0) {
      setLoading(false);
    }
  }, [data]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter: globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
  });

  return (
    <div className="overflow-x-auto ml-10 mr-10">
      {loading ? (
        <div className="container flex justify-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : (
        <>
          <div>
            <DebouncedInput
              value={globalFilter ?? ""}
              onChange={(value) => setGlobalFilter(String(value))}
              className="p-2 font-lg shadow border border-block"
              placeholder="Search all columns..."
            />
          </div>
          <div>
            <table className="table">
              {/* head */}
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        {header.column.getIsSorted() ? "▲" : "▼"}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {/* row 1 */}
                {table.getRowModel().rows.map((row) => (
                  <>
                    <tr key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  </>
                ))}
              </tbody>
              {/* pagination */}

              {/* botones de paginacion */}
              <button
                onClick={() => table.setPageIndex(0)}
                className="btn btn-sm m-8"
              >
                primera pagina
              </button>

              <div className="join">
                <button
                  onClick={() => table.previousPage()}
                  className="join-item btn"
                >
                  « anterior
                </button>
                <button className="join-item btn">
                  Page {table.getState().pagination.pageIndex + 1} of{" "}
                  {table.getPageCount()}
                </button>
                <button
                  onClick={() => table.nextPage()}
                  className={`${
                    table.getState().pagination.pageIndex + 1 ===
                    table.getPageCount()
                      ? "join-item btn btn-disabled"
                      : "join-item btn"
                  }`}
                >
                  siguente »
                </button>
              </div>

              <button
                className="btn btn-sm m-8 "
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              >
                Ultima pagina
              </button>

              <center>
                {/* numero de paginas */}
                <span className="items-center gap-1 m-10">
                  Go to page:
                  <input
                    type="number"
                    onChange={(e) => {
                      const page = e.target.value
                        ? Number(e.target.value) - 1
                        : 0;
                      table.setPageIndex(page);
                    }}
                    className="border p-1 rounded w-16"
                    value={table.getState().pagination.pageIndex + 1}
                  />
                </span>

                {/* numero filas a mostrar */}
                <select
                  value={table.getState().pagination.pageSize}
                  onChange={(e) => {
                    table.setPageSize(Number(e.target.value));
                  }}
                >
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                      Show {pageSize}
                    </option>
                  ))}
                </select>
              </center>
            </table>
          </div>
        </>
      )}
    </div>
  );
};
export default Order;

//////COMPONETES

// A debounced input react component
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value, debounce, onChange]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
