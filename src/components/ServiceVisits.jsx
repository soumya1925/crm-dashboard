import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchServiceVisits, setServiceVisitsFilters } from '../redux/serviceVisitsSlice';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  getFilteredRowModel,
} from '@tanstack/react-table';
import { Box, Button } from '@mui/material';

export default function ServiceVisits() {
  const dispatch = useDispatch();
  const { data, filters } = useSelector(state => state.serviceVisits);

  useEffect(() => {
    dispatch(fetchServiceVisits());
  }, [dispatch]);

  const columns = useMemo(() => [
    { header: 'Device ID', accessorKey: 'Device ID' },
    { header: 'Visit ID', accessorKey: 'Visit ID' },
    { header: 'Date', accessorKey: 'Date' },
    { header: 'Responsible Engineer', accessorKey: 'Responsible Engineer' },
    { header: 'Facility', accessorKey: 'Facility' },
    { header: 'Purpose', accessorKey: 'Purpose' },
    { header: 'Visit Notes', accessorKey: 'Visit Notes' },
    { header: 'Attachments', accessorKey: 'Attachments' },
  ], []);

  const table = useReactTable({
    data,
    columns,
    state: { columnFilters: filters },
    onColumnFiltersChange: (newFilters) => dispatch(setServiceVisitsFilters(newFilters)),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 15 } },
  });

  return (
    <div className="service-visits">
      <h2>Service Visits</h2>

      <Box sx={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', minWidth: '900px', borderCollapse: 'collapse' }}>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id} style={{ background: '#1976d2', color: 'white' }}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} style={{ padding: '10px', border: '1px solid #ddd' }}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} style={{ borderBottom: '1px solid #ddd' }}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} style={{ padding: '10px', textAlign: 'center' }}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Box>

      {/* Pagination Controls */}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 2, gap: 2 }}>
        <Button
          variant="contained"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <span>
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <Button
          variant="contained"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </Box>
    </div>
  );
}
