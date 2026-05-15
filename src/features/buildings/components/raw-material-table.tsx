import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDosingData } from '../hooks/use-dosing-data';
import { formatNumber } from '@/utils/formatter-number';

function createData(
    rawmaterial: string,
    quantity: number,
) {
    return { rawmaterial, quantity };
}

const rows = [
    createData('Frozen yoghurt', 159),
    createData('Ice cream sandwich', 237),
    createData('Eclair', 262),
    createData('Cupcake', 305),
    createData('Gingerbread', 356),
    createData('Gingerbread', 356),
    createData('Gingerbread', 356),
    createData('Gingerbread', 356),
    createData('Gingerbread', 356),
    createData('Gingerbread', 356),
    createData('Gingerbread', 356),
    createData('Gingerbread', 356),
];

export default function RawMaterialTable() {
  const { data, loading } = useDosingData();

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
                        <TableCell>Сырье</TableCell>
                        <TableCell align="right">Количество</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
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
