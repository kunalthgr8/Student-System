import { IoMenuOutline } from "react-icons/io5";
import { IoIosSearch, IoMdClose } from "react-icons/io";
import { GiSettingsKnobs } from "react-icons/gi";
import { GoBell } from "react-icons/go";
import { FaUser } from "react-icons/fa";
import { GoGear } from "react-icons/go";
import { PiGearBold } from "react-icons/pi";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { updateFilters, updateSearchQuery } from "../../app/features/studentSlice";
import FilterFields from "../Dashboard/FilterFields";
import Button from "../Button/Button";

const Header = () => {
    const [isFocused, setIsFocused] = useState(false);
    const [localSearchQuery, setLocalSearchQuery] = useState("");
    const [localHostelFacility, setLocalHostelFacility] = useState("All");
    const [localAcademicSession, setLocalAcademicSession] = useState("All");
    const [localProgram, setLocalProgram] = useState("All");
    const [localSemester, setLocalSemester] = useState("All");
    const [localCategory, setLocalCategory] = useState("All");
    const [isFilterBoxOpen, setIsFilterBoxOpen] = useState(false);

    const dispatch = useDispatch();
    const searchQuery = useSelector((state) => state.students.filters.searchQuery);
    const hostelFacility = useSelector((state) => state.students.filters.hostelFacility);
    const academicSession = useSelector((state) => state.students.filters.academicSession);
    const program = useSelector((state) => state.students.filters.program);
    const semester = useSelector((state) => state.students.filters.semester);
    const category = useSelector((state) => state.students.filters.category);

    const handleSearchChange = (e) => {
        setLocalSearchQuery(e.target.value);
    };

    const handleSearchKeyDown = (e) => {
        if (e.key === "Enter") {
            dispatch(updateSearchQuery(localSearchQuery));
            e.preventDefault();
        }
    };

    const toggleFilterBox = () => {
        setIsFilterBoxOpen(!isFilterBoxOpen);
    };

    const applyFilters = () => {
        dispatch(updateFilters({
            hostelFacility: localHostelFacility,
            academicSession: localAcademicSession,
            program: localProgram,
            semester: localSemester,
            category: localCategory,
        }));

        dispatch(fetchStudents());
        setIsFilterBoxOpen(false);
    };


    return (
        <div className="sticky top-0 left-0 z-10 flex items-center gap-3 w-full h-20 p-4 bg-nav-white">
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
                    value={localSearchQuery}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onChange={handleSearchChange}
                    onKeyDown={handleSearchKeyDown}
                />
                <div className="border-none p-1 bg-primary-light-color text-primary-color rounded-md hover:bg-primary-color hover:text-nav-white cursor-pointer ml-auto" >
                    <GiSettingsKnobs className="text-xl bg-[transparent] m-1 transition ease-out duration-500" onClick={toggleFilterBox} />
                    {isFilterBoxOpen && <div id="filterBox" className="absolute border border-secondary-color hover:text-primary-color p-4 rounded-md shadow-md top-20 right-5 z-5 cursor-default">
                        <div className="flex items-center justify-between">
                            <p>Choose the options from fields below</p>
                            <IoMdClose className="cursor-pointer text-2xl" onClick={toggleFilterBox} />
                        </div>
                        <div id="filterFields" className="grid grid-cols-2 gap-4 p-4">
                            <FilterFields
                                labelHTML="hostelFacility"
                                labelTag="Hostel Facility: "
                                selectID="hostelFacility"
                                options={["All", "Yes", "No"]}
                                value={localHostelFacility}
                                onChange={(e) => setLocalHostelFacility(e.target.value)}
                            />
                            <FilterFields
                                labelHTML="academicSession"
                                labelTag="Academic Session: "
                                selectID="academicSession"
                                options={["All", "2023-24M", "2023-24W", "2024-25M", "2024-25W"]}
                                value={localAcademicSession}
                                onChange={(e) => setLocalAcademicSession(e.target.value)}
                            />
                            <FilterFields
                                labelHTML="program"
                                labelTag="Program: "
                                selectID="program"
                                options={["All", "B.Tech", "M.Tech", "M.Sc.", "PhD"]}
                                value={localProgram}
                                onChange={(e) => setLocalProgram(e.target.value)}
                            />
                            <FilterFields
                                labelHTML="semester"
                                labelTag="Semester: "
                                selectID="semester"
                                options={["All", "1", "2", "3", "4", "5", "6", "7", "8"]}
                                value={localSemester}
                                onChange={(e) => setLocalSemester(e.target.value)}
                            />
                            <FilterFields
                                labelHTML="category"
                                labelTag="Category: "
                                selectID="category"
                                options={["All", "General", "OBC-NCL", "SC", "ST"]}
                                value={localCategory}
                                onChange={(e) => setLocalCategory(e.target.value)}
                            />
                        </div>
                        <Button
                            type="submit"
                            className="rounded-xl text-lg bg-primary-color hover:bg-[#6235b1] text-nav-white outline-none focus:bg-gray-50 duration-200 w-[30%] my-4"
                            onClick={applyFilters}
                        >
                            Apply Filter
                        </Button>
                    </div>
                    }
                </div>
            </div>
            <div className="flex gap-5 items-center py-1 px-3 bg-nav-white ml-auto">
                <div className="border-none p-1 bg-primary-light-color text-primary-color rounded-md hover:bg-primary-color hover:text-nav-white cursor-pointer">
                    <GoBell className="text-xl bg-[transparent] m-1 transition ease-out duration-500" />
                </div>
                <div className="p-3 rounded-full flex gap-4 items-center cursor-pointer text-secondary-color hover:bg-secondary-color hover:text-nav-white transition ease-out duration-500">
                    <FaUser className="text-xl bg-[transparent] mx-1 text-[#000000]" />
                    <GoGear className="font-bold text-2xl mx-1 bg-[transparent]" />
                </div>
            </div>
        </div>
    );
}

export default Header;