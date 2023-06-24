import React from 'react';
import { Link } from "react-router-dom"
import {
  Sidebar,
  Menu,
  MenuItem,
  useProSidebar,
  SubMenu,
} from "react-pro-sidebar";
import { AiOutlineMenu, AiOutlineUser, AiOutlineUsergroupAdd, AiOutlineUsergroupDelete, AiFillContacts, AiFillDatabase, AiFillFolder, AiFillFile, AiFillFileAdd, AiFillHome, AiFillPlusCircle, AiFillFileZip, AiFillShopping } from "react-icons/ai";


const SideBar = () => {

  const { collapseSidebar } = useProSidebar();

  return <div>
    <Sidebar style={{ height: "120vh", backgroundColor: "rgb(184, 219, 219)" }}>
      <Menu>
        <MenuItem
          icon={<AiOutlineMenu />}
          onClick={() => {
            collapseSidebar();
          }}
          style={{ textAlign: "center" }}
        >
          {" "}
          <h2>Sinh viên</h2>
        </MenuItem>
        <SubMenu icon={<AiFillFileZip />} label="Lịch thi">
          <MenuItem icon={<AiFillFile />}>
            <Link to="/xemlichthi" className="link" >
            Xem lịch thi
            </Link>
          </MenuItem>
        </SubMenu>
      </Menu>
    </Sidebar>
  </div>;
};

export default SideBar;
