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
import Popup_SV from '../Popup/Popup_SV';

const columns = [
  // { id: 'stt', label: 'STT', minWidth: 100, type: Number },
  { id: 'MSSV', label: 'MSSV', minWidth: 100, type: Number },
  { id: 'HO_TEN', label: 'Họ và tên', minWidth: 150 },
  {
    id: 'GIOI_TINH',
    label: 'Giới tính',
    minWidth: 100,
    align: 'left',
  },
  {
    id: 'NGAY_SINH',
    label: 'Ngày sinh',
    minWidth: 100,
    align: 'left',
    format: (value) => value.Date(),
  },
  {
    id: 'LOP',
    label: 'Lớp',
    minWidth: 100,
    align: 'left',
  },
  {
    id: 'DIA_CHI',
    label: 'Địa chỉ',
    minWidth: 100,
    align: 'left',
  },
  {
    id: 'VIEN',
    label: 'Viện',
    minWidth: 150,
    align: 'left',
  },
];

// function createData(STT, MSSV, HT, GT, NS, L, DC, V) {
//   return { STT, MSSV, HT, GT, NS, L, DC, V};
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

export default function Table_SV({}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [SV, setSV] = useState([])
  const [open, setOpen] = useState(false)
  const [CT, setCT] = useState([])
 
  React.useEffect(()=>{
    const fetchSV = async ()=>{
      const res = await axiosInstance.get('/students')
      setSV(res.data)
      // console.log("data:" +res.data)
    }
    fetchSV()
  },[])

//   const handleOpen = (id) => {
//     React.useEffect(()=>{
//       const fetchCT = async ()=>{
//         const res = await axiosInstance.get(`/students/${id}`)
//         setCT(res.data)
//         console.log("data1:" +res.data)
//       }
//       fetchCT()
//     },[])
//     setOpen(true);
//     // console.log('open1: ' + JSON.stringify(SV[0]))
//  };

const handleOpen = (id) =>
    {
      
      fetch(`http://localhost:5000/students/${id}`)
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
            { 
              SV
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row,index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index} onClick = {()=>handleOpen(row.MSSV)} style={{cursor: 'pointer'}}>
                    <TableCell className="tableCell">{index + 1  + page * rowsPerPage}</TableCell>
                    {columns.map((column) => {
                      const value = row[column.id];
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
        count={SV.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
         <Popup_SV data = {open} is={setOpen} SV = {CT}/>
    </Paper>
  );
}