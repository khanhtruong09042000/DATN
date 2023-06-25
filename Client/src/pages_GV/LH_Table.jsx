import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useState,useRef } from 'react';
import { CSVLink } from "react-csv";
import { useReactToPrint } from "react-to-print";


const columns = [
  // { key: 'STT', label: 'STT', minWidth: 170, type: Number },
  { key: 'MA_LOP_THI', label: 'Mã lớp thi', minWidth: 100, type: Number },
  { key: 'MSSV', label: 'MSSV', minWidth: 100, type: Number },
  { key: 'HO_TEN', label: 'Họ và tên', minWidth: 100 },
  {
    key: 'GIOI_TINH',
    label: 'Giới tính',
    minWidth: 100,
    align: 'left',
  },
  {
    key: 'NGAY_SINH',
    label: 'Ngày sinh',
    minWidth: 100,
    align: 'left',
    format: (value) => value.Date(),
  },
  {
    key: 'LOP',
    label: 'Lớp',
    minWidth: 100,
    align: 'left',
  }
];

export default function LH_Table({data}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  console.log('data: ' + JSON.stringify(data))

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' , margin: "30px 0px 0px 30px"}}>
        <CSVLink data={data} headers={columns}>
        <button className='sub' style={{backgroundColor: 'teal', marginBottom: '10px',marginTop: '0px',marginRight: '362.3px'}}>Dowload Excel</button>
  </CSVLink>
  <button onClick={handlePrint} className="sub"style={{backgroundColor: 'orange', marginBottom: '10px',marginTop: '0px'}}>  Print </button>
      <TableContainer sx={{ maxHeight: 440 }} ref={componentRef}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
            <TableCell className="tableCell" style={{ backgroundColor:"rgb(107, 116, 116)", color:"rgb(242, 247, 247)"}}>STT</TableCell>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth,  backgroundColor:"rgb(107, 116, 116)", color:"rgb(242, 247, 247)"}}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            { 
              data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row,index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}  >
                     <TableCell className="tableCell">{index + 1  + page * rowsPerPage}</TableCell>
                    {columns.map((column) => {
                      const value = row[column.key];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'Date'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            }
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {/* <Popup_SV data = {open} is={setOpen} SV = {data}/> */}
    </Paper>
  );
}