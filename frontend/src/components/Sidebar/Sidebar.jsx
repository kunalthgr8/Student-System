import { MdOutlineSpeed } from "react-icons/md";
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import { AiOutlineMoneyCollect } from "react-icons/ai";
import { FaRegCircleUser } from "react-icons/fa6";
import { TbSchool } from "react-icons/tb";
import { GoSignOut } from "react-icons/go";
import SidebarOptions from "./SidebarOptions";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ selected }) => {
    const navigate = useNavigate();

    return (
        <div className="fixed left-0 w-64 h-[100%] p-2 bg-nav-white bg-transparent-children">
            <SidebarOptions
                optionsIcon={MdOutlineSpeed}
                optionsText="Dashboard"
                onClick={() => navigate("/dashboard")}
                selected={selected === "Dashboard"}
            />
            <SidebarOptions
                optionsIcon={MdOutlineDriveFolderUpload}
                optionsText="Upload Data"
                onClick={() => navigate("/uploadData")}
                selected={selected === "Upload Data"}
            />
            <SidebarOptions
                optionsIcon={AiOutlineMoneyCollect}
                optionsText="Fee Waiver"
                onClick={() => navigate("/feeWaiver")}
                selected={selected === "Fee Waiver"}
            />
            <SidebarOptions
                optionsIcon={TbSchool}
                optionsText="Scholarship"
                onClick={() => navigate("/scholarship")}
                selected={selected === "Scholarship"}
            />
            <SidebarOptions
                optionsIcon={FaRegCircleUser}
                optionsText="Profile"
                onClick={() => navigate("/profile")}
                selected={selected === "Profile"}
            />
            <SidebarOptions
                optionsIcon={GoSignOut}
                optionsText="Log Out"
                onClick={() => navigate("/logout")}
                selected={selected === "Log Out"}
            />
        </div>
    );
};

export default Sidebar;
