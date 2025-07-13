import { Box, styled } from "@mui/material";
import BlockHeader from "../shared/BlockHeader";
import { useGetForecastQuery } from "../../services/weather";
import useCity from "../../hooks/useCity";
import { skipToken } from "@reduxjs/toolkit/query";
import WeeklyForecastSkeleton from "./components/WeeklyForecastSkeleton";
import EmptyDataText from "../shared/EmptyDataText";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';
import type { ColumnDef } from '@tanstack/react-table';
import dayjs from "dayjs";
import Navigation from "../Navigation/Navigation";


function WeeklyForecast() {
  const { city } = useCity();
  const { data, isLoading } = useGetForecastQuery(
    city ? { city } : skipToken
  );
  const forecastday = data?.forecast?.forecastday || [];
  // Define columns
  const columns: ColumnDef<any>[] = [
    {
      header: 'Day',
      accessorKey: 'date',
      cell: info => dayjs(info.getValue() as string).format('ddd'),
    },
    {
      header: 'Condition',
      accessorKey: 'day.condition',
      cell: info => {
        const condition = info.getValue() as {
          text: string;
          icon: string;
          code: number;
        };

        return (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            minWidth: '150px' // Ensure consistent width
          }}>
            <img
              src={`https:${condition.icon}`} // Add https: prefix if needed
              alt={condition.text}
              style={{
                width: '40px',
                height: '40px',
                objectFit: 'contain'
              }}
            />
            <span>{condition.text}</span>
          </div>
        );
      },
    },
    {
      header: 'Max Temp',
      accessorKey: 'day.maxtemp_c',
      cell: info => `${info.getValue()}°C`,
    },
    {
      header: 'Min Temp',
      accessorKey: 'day.mintemp_c',
      cell: info => `${info.getValue()}°C`,
    },
  ];

  const table = useReactTable({
    data: forecastday,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <WeeklyForecastSkeleton />;

  if (!data) {
    return <EmptyDataText message="No Weekly Forecast Data :(" />;
  }

  return (
    <Box sx={{ position: 'relative' }}>
      <Navigation />
      <BlockHeader variant="h6">Weekly Forecast</BlockHeader>
      <Table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
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
      </Table>
    </Box>
  );
}

export default WeeklyForecast;

const Table = styled('table')(({ theme }) => ({
  width: '100%',
  borderCollapse: 'separate',
  borderSpacing: '0 8px', // Adds spacing between rows
  '& thead th': {
    padding: theme.spacing(1.5),
    textAlign: 'center',
    fontWeight: 600,
    color: theme.palette.text.secondary,
    textTransform: 'uppercase',
    fontSize: '0.95rem',
    letterSpacing: '0.5px',
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  '& tbody td': {
    padding: theme.spacing(2),
    textAlign: 'center',
    backgroundColor: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette.divider}`,
    transition: 'background-color 0.2s ease',
    '&:first-of-type': {
      borderTopLeftRadius: '8px',
      borderBottomLeftRadius: '8px',
    },
    '&:last-of-type': {
      borderTopRightRadius: '8px',
      borderBottomRightRadius: '8px',
    }
  },
  '& tbody tr:hover td': {
    backgroundColor: theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, 0.05)'
      : 'rgba(0, 0, 0, 0.02)',
  },
}));