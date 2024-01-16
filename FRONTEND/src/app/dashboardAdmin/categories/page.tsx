"use client";
import React, { memo, useState } from "react";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { CategoryInterface } from "@/interfaces/CategoryInterface";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { getAllCategory } from "@/services/api/categories";
import { TiPlus } from "react-icons/ti";
import FormCategory from "@/components/forms/FormCategory";

const Categories = () => {
  const [data, setData] = useState([]); //data total
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  /////formdatos a actualizar
  const [dataUpdate, setDataUptate] = useState<CategoryInterface>();

  const handleModal = () => {
    setModal(false);
    setDataUptate(undefined);
  };

  ////////COLUMNAS TABLA
  const columnHelper = createColumnHelper<CategoryInterface>();

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.nombre, {
      id: "name",
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Name</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("descripcion", {
      header: () => "MAIL",
      cell: (info) => info.renderValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("imagen", {
      header: () => <span>Visits</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("estado", {
      header: "Status",
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("fecha_creacion", {
      header: "fecha_creacion",
      footer: (info) => info.column.id,
    }),

    columnHelper.accessor(`id`, {
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
              setModal(true);
              setDataUptate(info.row.original);
            }}
          >
            <FaEdit className="h-6 w-6" />
          </button>
        </>
      ),

      footer: (info) => info.column.id,
    }),
  ];

  React.useEffect(() => {
    (async () => {
      const response = await getAllCategory();
      setData(response);
      setLoading(false);
    })();
  }, [loading]);

  /////table
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
          {/* ADD CATEGOTEGORY*/}
          <button
            className="btn btn-circle btn-success m-1"
            onClick={() => {
              setModal(true);
              setDataUptate(undefined);
            }}
          >
            <TiPlus className="h-7 w-7" />
          </button>

          {/*MODAL FORMULARIO CATEGORY */}
          {modal === true ? (
            <div>
              <FormCategory data={dataUpdate} onChange={handleModal} />
            </div>
          ) : null}

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

export default memo(Categories);

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
