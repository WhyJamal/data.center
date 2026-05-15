'use client';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableSortLabel from '@mui/material/TableSortLabel';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { useDosingData } from '../hooks/use-dosing-data';
import { formatNumber } from '@/utils/formatter-number';
import { useState } from 'react';

export default function RawMaterialTable() {
    const { data, loading } = useDosingData();

    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [orderBy, setOrderBy] = useState<'rawmaterial' | 'quantity'>(
        'quantity'
    );

    const sortedData = [...data].sort((a, b) => {
        if (orderBy === 'quantity') {
            return order === 'asc'
                ? a.quantity - b.quantity
                : b.quantity - a.quantity;
        }

        return order === 'asc'
            ? a.rawmaterial.localeCompare(b.rawmaterial)
            : b.rawmaterial.localeCompare(a.rawmaterial);
    });

    const handleSort = (column: 'rawmaterial' | 'quantity') => {
        const isAsc = orderBy === column && order === 'asc';

        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(column);
    };

    return (
        <TableContainer
            component={Paper}
            sx={{
                maxHeight: 260,
                overflowY: "auto",
            }}
        >
            <Table stickyHeader sx={{ minWidth: 650 }} size="small" aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <TableSortLabel
                                active={orderBy === 'rawmaterial'}
                                direction={orderBy === 'rawmaterial' ? order : 'asc'}
                                onClick={() => handleSort('rawmaterial')}
                            >
                                Сырье
                            </TableSortLabel>
                        </TableCell>
                        <TableCell align="right">
                            <TableSortLabel
                                active={orderBy === 'quantity'}
                                direction={orderBy === 'quantity' ? order : 'asc'}
                                onClick={() => handleSort('quantity')}
                            >
                                Количество
                            </TableSortLabel>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedData.map((row) => (
                        <TableRow
                            key={row.rawmaterial}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.rawmaterial}
                            </TableCell>
                            <TableCell align="right">{formatNumber(row.quantity)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
