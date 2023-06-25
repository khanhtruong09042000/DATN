import * as React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { useState } from "react";
import Slide from '@mui/material/Slide';
import {axiosInstance} from "../../config"
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "../table/table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from '@mui/material/TablePagination';

const Transition = React.forwardRef(function Transition(props, ref) {
   return <Slide direction="up" ref={ref} {...props} />;
 });


const Popup_SV = ({data,is}) => {
    const [SV, setSV] = useState([])
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    React.useEffect(()=>{
        const fetchU = async ()=>{
          const res = await axiosInstance.get('/user/finds/SV')
          setSV(res.data)
        }
        fetchU()
      },[])

    const handleClose = () => {
       is(false);
    };
    const buttonStyle = {
       width: "10rem",
       fontsize: "1.5rem",
       height: "2rem",
       padding: "5px",
       borderRadius: "10px",
       backgroundColor: "green",
       color: "White",
       border: "2px solid yellow",
    };
    const form = {
      margin: '0px 20px 10px'
    };
    const but = {
       display : 'flex',
       justifyContent: 'center'
    };
    return (
       <>
          <Dialog  open = {data} TransitionComponent={Transition}>
             <DialogTitle style={{fontFamily: 'Oswald, sans-serif',fontSize: '25px'}}> Danh sách sinh viên </DialogTitle>
             <div  style={form} >
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
          {SV
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
      count={SV.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
    </TableContainer>

    <div className="but" style={but}>
              <button className='sub' style={{backgroundColor: 'teal'}} onClick = {()=>handleClose()}>Cancel</button>
              </div>
              </div>
          </Dialog>
       </>
    );
};

export default Popup_SV;
