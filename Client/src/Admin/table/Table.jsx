import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from '@mui/material/TablePagination';
import * as React from 'react';
import {axiosInstance} from "../../config"
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../../Redux/userSlice';

const List = () => {
  const rows = [
    {
      id: 1143155,
      product: "Acer Nitro 5",
      img: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "John Smith",
      date: "1 March",
      amount: 785,
      method: "Cash on Delivery",
      status: "Approved",
    },
    {
      id: 2235235,
      product: "Playstation 5",
      img: "https://m.media-amazon.com/images/I/31JaiPXYI8L._AC_UY327_FMwebp_QL65_.jpg",
      customer: "Michael Doe",
      date: "1 March",
      amount: 900,
      method: "Online Payment",
      status: "Pending",
    },
    {
      id: 2342353,
      product: "Redragon S101",
      img: "https://m.media-amazon.com/images/I/71kr3WAj1FL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "John Smith",
      date: "1 March",
      amount: 35,
      method: "Cash on Delivery",
      status: "Pending",
    },
    {
      id: 2357741,
      product: "Razer Blade 15",
      img: "https://m.media-amazon.com/images/I/71wF7YDIQkL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "Jane Smith",
      date: "1 March",
      amount: 920,
      method: "Online",
      status: "Approved",
    },
    {
      id: 2342355,
      product: "ASUS ROG Strix",
      img: "https://m.media-amazon.com/images/I/81hH5vK-MCL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "Harold Carol",
      date: "1 March",
      amount: 2000,
      method: "Online",
      status: "Pending",
    },
  ];

  const user = useSelector(selectUser);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [users, setUsers] = React.useState([])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(()=>{
    const fetchHP = async ()=>{
      const res = await axiosInstance.get('/user/find')
      setUsers(res.data)
      // console.log("data_u:" + JSON.stringify(res.data))
    }
    fetchHP()
  },[])

  return (
    <TableContainer component={Paper} className="table2">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead style={{ backgroundColor:"rgb(107, 116, 116)"}}>
          <TableRow>
            <TableCell className="tableCell" style={{ color:"rgb(242, 247, 247)"}}>STT</TableCell>
            <TableCell className="tableCell"style={{ color:"rgb(242, 247, 247)"}}>Image</TableCell>
            <TableCell className="tableCell"style={{ color:"rgb(242, 247, 247)"}}>Username</TableCell>
            <TableCell className="tableCell"style={{ color:"rgb(242, 247, 247)"}}>MSSV/ID</TableCell>
            <TableCell className="tableCell"style={{ color:"rgb(242, 247, 247)"}}>Level</TableCell>
            <TableCell className="tableCell"style={{ color:"rgb(242, 247, 247)"}}>Email</TableCell>
            <TableCell className="tableCell"style={{ color:"rgb(242, 247, 247)"}}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((row, index) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{index + 1  + page * rowsPerPage}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src=
                  {
                    row.Img ? row.Img : "https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=170667a&w=0&k=20&c=m-F9Doa2ecNYEEjeplkFCmZBlc5tm1pl1F7cBCh9ZzM="
                  }
                  alt="" className="image" />
                </div>
              </TableCell>
              <TableCell className="tableCell">{row.username}</TableCell>
              <TableCell className="tableCell">{row.MSSV}</TableCell>
              <TableCell className="tableCell">{row.level}</TableCell>
              <TableCell className="tableCell">{row.email}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
         <TablePagination
      rowsPerPageOptions={[5, 15, 100]}
      component="div"
      count={users.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
    </TableContainer>
  );
};

export default List;