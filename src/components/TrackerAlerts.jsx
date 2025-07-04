
import React, { useEffect } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';
import { Box, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrackerAlerts } from '../redux/trackerAlertsSlice';

export default function TrackerAlerts() {
  const dispatch = useDispatch();
  const { data } = useSelector(state => state.trackerAlerts);

  useEffect(() => {
    dispatch(fetchTrackerAlerts());
  }, [dispatch]);

  const columns = React.useMemo(() => [
    { header: 'Visit ID', accessorKey: 'Visit ID' },
    { header: 'Device ID', accessorKey: 'Device ID' },
    { header: 'Date', accessorKey: 'Date' },
    { header: 'Engineer', accessorKey: 'Responsible Engineer' },
    { header: 'Issue Reported', accessorKey: 'Issue Reported' },
    { header: 'Issue Status', accessorKey: 'Issue Status' },
    { header: 'Photos Uploaded', accessorKey: 'Photos Uploaded' },
    { header: 'Alert Raised To', accessorKey: 'Alert Raised To' },
    { header: 'Notes', accessorKey: 'Notes' },
  ], []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  });

  return (
    <div className="tracker-alerts">
      <h2>Tracker Alerts</h2>

      <Box sx={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', minWidth: '1000px', borderCollapse: 'collapse' }}>
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
                    {
                      Array.isArray(cell.getValue())
                        ? cell.getValue().join(', ') // for array fields like Photos Uploaded
                        : flexRender(cell.column.columnDef.cell, cell.getContext())
                    }
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
