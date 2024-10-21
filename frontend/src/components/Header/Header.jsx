import { IoMenuOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { GiSettingsKnobs } from "react-icons/gi";
import { GoBell } from "react-icons/go";
import { FaUser } from "react-icons/fa";
import { GoGear } from "react-icons/go";
import { PiGearBold } from "react-icons/pi";
import { useState } from "react";

const Header = () => {

    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className="sticky top-0 left-0 z-10 flex items-center gap-3 w-full p-4 bg-nav-white">
            <div className="border-none p-1 bg-primary-light-color text-primary-color rounded-md hover:bg-primary-color hover:text-nav-white cursor-pointer">
                <IoMenuOutline className="text-2xl bg-[transparent] transition ease-out duration-500" />
            </div>
            <div className="font-bold text-2xl bg-nav-white text-primary-color">Student Management System</div>
            <div
                className={`w-[30%] flex items-center gap-2 bg-[#f8fafc] border py-1 px-3 mx-2 rounded-md ${isFocused ? " border-2 border-secondary-color hover:border-secondary-color" : "border-nav-active hover:border-[#000000]"}`}
            >
                <IoIosSearch className="text-2xl bg-[transparent]" />
                <input
                    type="search"
                    placeholder="Search..."
                    className="w-[60%] p-2 border-none bg-[transparent] outline-none"
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
                <div className="border-none p-1 bg-primary-light-color text-primary-color rounded-md hover:bg-primary-color hover:text-nav-white cursor-pointer ml-auto" >
                    <GiSettingsKnobs className="text-xl bg-[transparent] m-1 transition ease-out duration-500" />
                </div>
            </div>
            <div className="flex gap-5 items-center py-1 px-3 bg-nav-white ml-auto">
                <div className="border-none p-1 bg-primary-light-color text-primary-color rounded-md hover:bg-primary-color hover:text-nav-white cursor-pointer">
                    <GoBell className="text-xl bg-[transparent] m-1 transition ease-out duration-500" />
                </div>
                <div className="p-3 rounded-full flex gap-4 items-center cursor-pointer text-secondary-color hover:bg-secondary-color hover:text-nav-white">
                    <FaUser className="text-xl bg-[transparent] mx-1 text-[#000000]" />
                    <GoGear className="font-bold text-2xl mx-1 bg-[transparent]"/>
                </div>
            </div>
        </div>
    );
}

export default Header;