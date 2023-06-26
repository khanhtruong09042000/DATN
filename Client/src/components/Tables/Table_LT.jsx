import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {axiosInstance} from "../../config"
import { useState } from 'react';
import Popup_LT from '../Popup/Popup_LT';

const columns = [
  // { id: 'STT', label: 'STT', minWidth: 100, type: Number },
  { id: 'ID', label: 'ID lịch thi', minWidth: 100, type: Number },
  { id: 'HINH_THUC_THI', label: 'Hình thức thi', minWidth: 100 },
  // {
  //   id: 'TLT',
  //   label: 'Tên lớp thi',
  //   minWidth: 170,
  //   align: 'right',
  // },
  {
    id: 'NGAY_THI',
    label: 'Ngày thi',
    minWidth: 170,
    align: 'right',
  },
  // {
  //   id: 'THP',
  //   label: 'Tên học phần',
  //   minWidth: 170,
  //   align: 'right',
  // },
  {
    id: 'KY_HOC',
    label: 'Kỳ học',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'GIO_THI',
    label: 'Giờ thi',
    minWidth: 170,
    align: 'right',
  },
  // {
  //   id: 'MSSV',
  //   label: 'MSSV',
  //   minWidth: 170,
  //   align: 'right',
  // },
  {
    id: 'MA_LOP_THI',
    label: 'Mã lớp thi',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'MA_HP',
    label: 'Mã học phần',
    minWidth: 170,
    align: 'right',
  },
];

// function createData(STT, ID, HTT, TLT, NT, THP, KH, GT, MSSV, MLT, MHP) {
//   return { STT, ID, HTT, TLT, NT, THP, KH, GT, MSSV, MLT, MHP};
// }

// const rows = [
//   createData(1, 'IN', "1324171354", 1),
//   createData(2, 'IN', "1324171354", 1),
//   createData(3, 'IN', "1324171354", 1),
//   createData(4, 'IN', "1324171354", 1),
//   createData(5, 'IN', "1324171354", 1),
//   createData(6, 'IN', "1324171354", 1),
//   createData(7, 'IN', "1324171354", 1),
//   createData(8, 'IN', "1324171354", 1),
//   createData(9, 'IN', "1324171354", 1),
//   createData(10, 'IN', "1324171354", 1),
//    createData(11, 'IN', "1324171354", 1),
// ];

export default function Table_LT() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [LT, setLT] = useState([])
  const [open, setOpen] = useState(false)
  const [CT, setCT] = useState([])
 
  React.useEffect(()=>{
    const fetchLT = async ()=>{
      const res = await axiosInstance.get('/schedules')
      setLT(res.data)
      console.log("data:" +res.data)
    }
    fetchLT()
  },[])

  const handleOpen = (id) =>
    {
      
      fetch(`https://datn-production.up.railway.app/schedules/${id}`)
      .then(resposne=> resposne.json())
      .then(res=>setCT(res))
      setOpen(true);
    }
    console.log("data2:" +JSON.stringify(CT))

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' , margin: "30px 0px 0px 30px"}}>
      <TableContainer sx={{ maxHeight: 440 }}>
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
            {LT
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row,index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code} onClick = {()=>handleOpen(row.ID)} style={{cursor: 'pointer'}}>
                    <TableCell className="tableCell">{index + 1  + page * rowsPerPage}</TableCell>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={LT.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Popup_LT data = {open} is={setOpen} SV = {CT}/>
    </Paper>
  );
}
