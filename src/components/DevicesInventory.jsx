





import React, { useMemo, useEffect } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
} from '@tanstack/react-table';
import { Box, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, fetchDevices } from '../redux/deviceSlice';

export default function DevicesInventory() {
  const dispatch = useDispatch();

  const data = useSelector(state => state.devices.data);
  const filters = useSelector(state => state.devices.filters);

  
  useEffect(() => {
    dispatch(fetchDevices());
  }, [dispatch]);

  const columns = useMemo(() => [
    { header: 'Device Type', accessorKey: 'Device Type', filterFn: 'equals' },
    { header: 'Device ID', accessorKey: 'Device ID' },
    { header: 'Facility', accessorKey: 'Facility' },
    { header: 'Status', accessorKey: 'Status', filterFn: 'equals' },
    { header: 'Battery %', accessorKey: 'Battery %' },
    { header: 'Last Service / Installation Date', accessorKey: 'Last Service / Installation Date' },
  ], []);

  const columnFilters = useMemo(() => {
    const filterMap = [];
    if (filters.status) filterMap.push({ id: 'Status', value: filters.status });
    if (filters.deviceType) filterMap.push({ id: 'Device Type', value: filters.deviceType });
    return filterMap;
  }, [filters]);

  const table = useReactTable({
    data,
    columns,
    state: { columnFilters },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 15 } },
  });

  const handleFilterChange = (key, value) => {
    dispatch(setFilter({ key, value }));
  };

  return (
    <div className="devices-inventory">
      <h2>Devices Inventory</h2>

      {/* Filters */}
      <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
        <FormControl size="small">
          <InputLabel>Status</InputLabel>
          <Select
            value={filters.status}
            label="Status"
            onChange={(e) => handleFilterChange('status', e.target.value)}
            sx={{ minWidth: 150 }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Offline">Offline</MenuItem>
            <MenuItem value="Maintenance">Maintenance</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small">
          <InputLabel>Device Type</InputLabel>
          <Select
            value={filters.deviceType}
            label="Device Type"
            onChange={(e) => handleFilterChange('deviceType', e.target.value)}
            sx={{ minWidth: 150 }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Gateway">Gateway</MenuItem>
            <MenuItem value="Camera">Camera</MenuItem>
            <MenuItem value="Sensor">Sensor</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Table */}
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
        <Button variant="contained" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Previous
        </Button>
        <span>
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <Button variant="contained" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
        </Button>
      </Box>
    </div>
  );
}
