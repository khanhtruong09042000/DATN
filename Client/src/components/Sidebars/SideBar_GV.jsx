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
          <h2>Giáo viên</h2>
        </MenuItem>
        <SubMenu icon={<AiFillFileZip />} label="Lịch thi">
          <MenuItem icon={<AiFillFile />}>
            <Link to="/dangkihinhthucthi" className="link" >
            Đăng kí hình thức thi
            </Link>
          </MenuItem>
        </SubMenu>
        <SubMenu icon={<AiFillShopping />} label="Danh sách thi">
          <MenuItem icon={<AiOutlineUsergroupAdd />}>
            <Link to="/xemdanhsachlopthi" className="link" >
              Xem danh sách lớp thi
            </Link>
          </MenuItem>
        </SubMenu>
      </Menu>
    </Sidebar>
  </div>;
};

export default SideBar;
