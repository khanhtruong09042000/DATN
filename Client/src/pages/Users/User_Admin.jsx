import React from 'react'
import Footer1 from '../../components/Footer1/Footer1';
import Navbar from '../../components/Navbar/Navbar';
import SideBar from '../../components/Sidebars/SideBar';
import Widget from '../../Admin/widget/Widget';
import Featured from "../../Admin/featured/Featured";
import Chart from "../../Admin/chart/Chart";
import Table from "../../Admin/table/Table";
import { useSelector, useDispatch } from 'react-redux';
import { logout, selectUser } from '../../Redux/userSlice';

function User_Admin() {
  const user = useSelector(selectUser);
  console.log('user1: ' + JSON.stringify(user) )

  return <div className='table_HP'>
      <Navbar/>
      <div className="containerHP">
          <SideBar/>
          <div className="table2">
              {/* <h1>Thêm User</h1> */}
              <div className="widgets">
          <Widget type="GV" />
          <Widget type="GV1" />
          <Widget type="SV" />
          <Widget type="balance" />
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Danh sách Users</div>
          <Table />
        </div>
          </div>
      </div>
      <Footer1/>
  </div>;
}

export default User_Admin