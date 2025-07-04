// import React, { useEffect, useMemo } from 'react';
// import {
//   useReactTable,
//   getCoreRowModel,
//   getPaginationRowModel,
//   flexRender,
// } from '@tanstack/react-table';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchAMCTrackerDataFromLocal, setAMCTrackerFilters } from '../redux/amcTrackerSlice';
// import { Box, Button } from '@mui/material';

// export default function AMCTracker() {
//   const dispatch = useDispatch();
//   const { data } = useSelector((state) => state.amcTracker);

//   // Fetch data on mount
//   useEffect(() => {
//     dispatch(fetchAMCTrackerDataFromLocal());
//   }, [dispatch]);

//   const columns = useMemo(() => [
//     { header: 'Device ID', accessorKey: 'Device ID' },
//     { header: 'Device Type', accessorKey: 'Device Type' },
//     { header: 'Facility', accessorKey: 'Facility' },
//     { header: 'AMC/CMC Type', accessorKey: 'AMC/CMC Type' },
//     { header: 'Contract Start', accessorKey: 'Contract Start' },
//     { header: 'Contract End', accessorKey: 'Contract End' },
//     { header: 'Days to Expiry', accessorKey: 'Days to Expiry' },
//     { header: 'Contract Status', accessorKey: 'Contract Status' },
//   ], []);

//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     initialState: {
//       pagination: { pageSize: 15 },
//     },
//   });

//   return (
//     <div className="amc-tracker">
//       <h2>AMC/CMC Tracker</h2>

//       {/* Scrollable Table */}
//       <Box sx={{ overflowX: 'auto' }}>
//         <table style={{ width: '100%', minWidth: '900px', borderCollapse: 'collapse' }}>
//           <thead>
//             {table.getHeaderGroups().map(headerGroup => (
//               <tr key={headerGroup.id} style={{ background: '#1976d2', color: 'white' }}>
//                 {headerGroup.headers.map(header => (
//                   <th key={header.id} style={{ padding: '10px', border: '1px solid #ddd' }}>
//                     {flexRender(header.column.columnDef.header, header.getContext())}
//                   </th>
//                 ))}
//               </tr>
//             ))}
//           </thead>
//           <tbody>
//             {table.getRowModel().rows.map(row => (
//               <tr key={row.id} style={{ borderBottom: '1px solid #ddd' }}>
//                 {row.getVisibleCells().map(cell => (
//                   <td key={cell.id} style={{ padding: '10px', textAlign: 'center' }}>
//                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </Box>

//       {/* Pagination Controls */}
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 2, gap: 2 }}>
//         <Button
//           variant="contained"
//           onClick={() => table.previousPage()}
//           disabled={!table.getCanPreviousPage()}
//         >
//           Previous
//         </Button>
//         <span>
//           Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
//         </span>
//         <Button
//           variant="contained"
//           onClick={() => table.nextPage()}
//           disabled={!table.getCanNextPage()}
//         >
//           Next
//         </Button>
//       </Box>
//     </div>
//   );
// }

import React, { useEffect, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAMCTrackerDataFromLocal } from '../redux/amcTrackerSlice';
import { Box, Button } from '@mui/material';

export default function AMCTracker() {
  const dispatch = useDispatch();

  // Directly use the device state from registerDevice
  const { medicalDevices } = useSelector(state => state.registerDevice);

  // Update AMC Tracker whenever device data changes
  useEffect(() => {
    dispatch(fetchAMCTrackerDataFromLocal(medicalDevices));
  }, [dispatch, medicalDevices]);

  const amcData = useSelector((state) => state.amcTracker.data);

  const columns = useMemo(() => [
    { header: 'Device ID', accessorKey: 'Device ID' },
    { header: 'Device Type', accessorKey: 'Device Type' },
    { header: 'Facility', accessorKey: 'Facility' },
    { header: 'AMC/CMC Type', accessorKey: 'AMC/CMC Type' },
    { header: 'Contract Start', accessorKey: 'Contract Start' },
    { header: 'Contract End', accessorKey: 'Contract End' },
    { header: 'Days to Expiry', accessorKey: 'Days to Expiry' },
    { header: 'Contract Status', accessorKey: 'Contract Status' },
  ], []);

  const table = useReactTable({
    data: amcData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: { pageSize: 15 },
    },
  });

  return (
    <div className="amc-tracker">
      <h2>AMC/CMC Tracker</h2>

      {/* Scrollable Table */}
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
