import React, { useEffect, useMemo, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
} from '@tanstack/react-table';
import { Box, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTrainingData } from '../redux/trainingSlice';

export default function TrainingModule() {
  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.training);

  const [columnFilters, setColumnFilters] = useState([]);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTrainingData());
    }
  }, [status, dispatch]);

  const columns = useMemo(() => [
    { header: 'Device Type', accessorKey: 'Device Type' },
    { header: 'Device ID', accessorKey: 'Device ID' },
    { header: 'Facility', accessorKey: 'Facility' },
    { header: 'Installation Date', accessorKey: 'Installation Date' },
    { header: 'Unboxing Photos', accessorKey: 'Unboxing Photos' },
    { header: 'Checklist Completion', accessorKey: 'Checklist Completion' },
    { header: 'Training Submitted', accessorKey: 'Training Submitted', filterFn: 'equals' },
    { header: 'Completion Status', accessorKey: 'Completion Status', filterFn: 'equals' },
  ], []);

  const table = useReactTable({
    data,
    columns,
    state: { columnFilters },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 15 } },
  });

  // Helper to update filters
  const updateFilter = (id, value) => {
    setColumnFilters((prev) => {
      // If value is empty, remove the filter
      if (value === '') {
        return prev.filter((f) => f.id !== id);
      }
  
      const existingFilter = prev.find((f) => f.id === id);
      if (existingFilter) {
        return prev.map((f) => (f.id === id ? { ...f, value } : f));
      }
  
      return [...prev, { id, value }];
    });
  };

  return (
    <div className="training-module">
      <h2>Training Module</h2>

      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error loading data.</p>}

      {status === 'succeeded' && (
        <>
          {/* Filters */}
          <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
            <FormControl size="small">
              <InputLabel>Training Submitted</InputLabel>
              <Select
                value={columnFilters.find(f => f.id === 'Training Submitted')?.value || ''}
                label="Training Submitted"
                onChange={(e) => updateFilter('Training Submitted', e.target.value)}
                sx={{ minWidth: 150 }}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small">
              <InputLabel>Completion Status</InputLabel>
              <Select
                value={columnFilters.find(f => f.id === 'Completion Status')?.value || ''}
                label="Completion Status"
                onChange={(e) => updateFilter('Completion Status', e.target.value)}
                sx={{ minWidth: 150 }}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Table with Scroll */}
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
        </>
      )}
    </div>
  );
}
