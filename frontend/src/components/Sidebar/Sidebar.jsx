import { MdOutlineSpeed } from "react-icons/md";
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import { AiOutlineMoneyCollect } from "react-icons/ai";
import { FaRegCircleUser } from "react-icons/fa6";
import { TbSchool } from "react-icons/tb";
import { GoSignOut } from "react-icons/go";
import SidebarOptions from "./SidebarOptions";

const Sidebar = () => {
    return (
        <div className="fixed left-0 w-64 h-[100%] p-2 bg-nav-white bg-transparent-children">
            <SidebarOptions optionsIcon={MdOutlineSpeed} optionsText="Dashboard" />
            <SidebarOptions optionsIcon={MdOutlineDriveFolderUpload} optionsText="Upload Data" />
            <SidebarOptions optionsIcon={AiOutlineMoneyCollect} optionsText="Fee Waiver" />
            <SidebarOptions optionsIcon={TbSchool} optionsText="Scholarship" />
            <SidebarOptions optionsIcon={FaRegCircleUser} optionsText="Profile" />
            <SidebarOptions optionsIcon={GoSignOut} optionsText="Log Out" />
        </div>
    );
}

export default Sidebar;