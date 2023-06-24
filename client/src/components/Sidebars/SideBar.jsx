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
    <Sidebar style={{ height: "100%", backgroundColor: "rgb(184, 219, 219)" }}>
      <Menu>
        <MenuItem
          icon={<AiOutlineMenu />}
          onClick={() => {
            collapseSidebar();
          }}
          style={{ textAlign: "center" }}
        >
          {" "}
          <h2>Giáo vụ</h2>
        </MenuItem>
        <SubMenu icon={<AiOutlineUser />} label="Quản lí Users">
          <MenuItem icon={<AiOutlineUsergroupAdd />}>
            <Link to="/themUser" className="link" >
            Thêm User
            </Link>
          </MenuItem>
          <MenuItem icon={<AiOutlineUsergroupDelete />}>
          <Link to="/danhsachUser" className="link" >
            Danh sách Users
            </Link>
            </MenuItem>
        </SubMenu>
        <SubMenu icon={<AiFillShopping />} label="Giáo viên">
          <MenuItem icon={<AiOutlineUsergroupAdd />}>
            <Link to="/themgiaovien" className="link" >
              Thêm Giáo viên
            </Link>
          </MenuItem>
          <MenuItem icon={<AiOutlineUsergroupDelete />}>
            <Link to="/danhsachgiaovien" className="link">
              Danh sách giáo viên
            </Link>
          </MenuItem>
        </SubMenu>
        <SubMenu icon={<AiFillContacts />} label="Sinh viên">
          <MenuItem icon={<AiOutlineUsergroupAdd />}>
            <Link to="/themsinhvien" className="link" >
              Thêm sinh viên
            </Link>
          </MenuItem>
          <MenuItem icon={<AiOutlineUsergroupDelete />}>
            <Link to="/danhsachsinhvien" className="link">
              Danh sách sinh viên
            </Link>
          </MenuItem>
        </SubMenu>
        <SubMenu icon={<AiFillDatabase />} label="Học phần">
          <MenuItem icon={<AiFillFileAdd />}>
            <Link to="/themhocphan" className="link" >
              Thêm học phần
            </Link>
          </MenuItem>
          <MenuItem icon={<AiFillFile />}>
            <Link to="/danhsachhocphan" className="link" >
              Danh sách học phần
            </Link>
          </MenuItem>
        </SubMenu>
        <SubMenu icon={<AiFillHome />} label="Lớp thi">
          <MenuItem icon={<AiFillPlusCircle />}>
            <Link to="/themlopthi" className="link" >
              Thêm lớp
            </Link>
          </MenuItem>
          <MenuItem icon={<AiFillFolder />}>
            <Link to="/danhsachlopthi" className="link" >
              Danh sách lớp
            </Link>
          </MenuItem>
        </SubMenu>
        <SubMenu icon={<AiFillFileZip />} label="Lịch thi">
          <MenuItem icon={<AiFillPlusCircle />}>
            <Link to="/sapxeplichthi" className="link" >
              Sắp xếp lịch thi
            </Link>
          </MenuItem>
          <MenuItem icon={<AiFillFile />}>
            <Link to="/danhsachlichthi" className="link" >
              Danh sách lịch thi
            </Link>
          </MenuItem>
        </SubMenu>
      </Menu>
    </Sidebar>
  </div>;
};

export default SideBar;
