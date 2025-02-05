import { useEffect, useState } from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Loader from "../../assets/Loader.webm";
import Button from "../Button/Button";
import FilterFields from "./FilterFields";

import * as XLSX from 'xlsx';
import { saveAs } from "file-saver";

import { HiOutlineDownload } from "react-icons/hi";


const DashboardMain = () => {

    const [studentsData, setStudentsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hostelFacility, setHostelFacility] = useState("");
    const [academicSession, setAcademicSession] = useState("");
    const [program, setProgram] = useState("");
    const [semester, setSemester] = useState("");
    const [category, setCategory] = useState("");

    useEffect(() => {
        fetch("http://localhost:8000/api/data/students")
            .then(response => response.json())
            .then(data => {
                setStudentsData(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    }, []);

    const applyFilters = (hostelFacility, academicSession, program, semester, category) => {
        const queryParams = new URLSearchParams({
            hostelFacility,
            academicSession,
            program,
            semester,
            category,
        }).toString();

        setLoading(true);
        fetch(`http://localhost:8000/api/data/students/filtered?${queryParams}`)
            .then(response => response.json())
            .then(data => {
                setStudentsData(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching filtered data:", error);
                setLoading(false);
            });
    };

    const columns = [
        { label: "Availing Hostel Facility", key: 'availingHostel', rowWidth: "100" },
        { label: "ID Number", key: 'idNumber', rowWidth: "120" },
        { label: "Name of the Candidate", key: 'candidateName', rowWidth: "200" },
        { label: "Academic Session", key: 'academicSession', rowWidth: "120" },
        { label: "Program", key: 'program' },
        { label: "Semester", key: 'semester' },
        { label: "Category", key: 'category' },
        { label: "Admission Fee", key: 'admissionFee' },
        { label: "ID Card and Certificates Fee", key: 'idCardFee' },
        { label: "Library Fee", key: 'libraryFee' },
        { label: "Celebration Fee", key: 'celebrationFee' },
        { label: "Training & Placement Fee", key: 'placementFee' },
        { label: "Alumni Life Membership", key: 'alumniMembership' },
        { label: "Caution Money Deposite", key: 'cautionMoneyDeposit' },
        { label: "Registration Fee", key: 'registrationFee' },
        { label: "Tuition Fee", key: 'tuitionFee' },
        { label: "CoSA Fee", key: 'coSAFee' },
        { label: "Health Facility Charges", key: 'healthFacility' },
        { label: "Other Fee", key: 'otherFee' },
        { label: "Student Welfare Fund (Not Fee)", key: 'studentWelfareFund' },
        { label: "Insurance Premium", key: 'insurancePremium' },
        { label: "Hostel Admission Fee", key: 'hostelAdmissionFee' },
        { label: "Hostel License Fee", key: 'hostelLicenseFee' },
        { label: "Hostel and Mess Establishment Charges", key: 'establishmentCharges' },
        { label: "Dinning Charges", key: 'diningCharges' },
        { label: "Gross Total Fee", key: 'grossTotalFee' },
        { label: "Fee Waiver", key: 'feeWaiver' },
        { label: "Seat Booking/ Dining Fee Adjustment", key: 'feeAdjustment' },
        { label: "Payable Fee", key: 'payableFee' }
    ];


    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(studentsData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(data, 'student_data.xlsx');
    };


    if (loading) return <>
        <div className="w-full h-[100vh] flex items-center justify-center">
            <video
                src={Loader}
                autoPlay
                loop
                muted
            ></video>
        </div>
    </>;

    return (
        <div className="w-full h-full">
            <Header />
            <div className="flex">
                <Sidebar selected="Dashboard" />
                <div
                    className="flex-1 flex-col p-4 relative text-center items-center justify-center"
                    style={{ maxWidth: "calc(100% - 16rem)", left: "16rem", height: "calc(100vh - 5rem)" }}
                >
                    <h1 className="w-full text-2xl font-bold m-4 text-primary-color">Student Details</h1>
                    <div
                        className="absolute z-10 top-5 right-5 w-9 border-none p-1 bg-primary-light-color text-primary-color rounded-md hover:bg-primary-color hover:text-nav-white cursor-pointer"
                        onClick={exportToExcel}
                    >
                        <HiOutlineDownload className="text-xl bg-[transparent] m-1 transition ease-out duration-500" />
                    </div>
                    <div id="filterBox">
                        <p>Choose the options from fields below</p>
                        <div id="filterFields" className="grid grid-cols-2 gap-4 p-4">
                            <FilterFields
                                labelHTML="hostelFacility"
                                labelTag="Hostel Facility: "
                                selectID="hostelFacility"
                                options={["All", "Yes", "No"]}
                                value={hostelFacility}
                                onChange={setHostelFacility}
                            />
                            <FilterFields
                                labelHTML="academicSession"
                                labelTag="Academic Session: "
                                selectID="academicSession"
                                options={["All", "2023-24M", "2023-24W", "2024-25M", "2024-25W"]}
                                value={academicSession}
                                onChange={setAcademicSession}
                            />
                            <FilterFields
                                labelHTML="program"
                                labelTag="Program: "
                                selectID="program"
                                options={["All", "B.Tech", "M.Tech", "M.Sc.", "PhD"]}
                                value={program}
                                onChange={setProgram}
                            />
                            <FilterFields
                                labelHTML="semester"
                                labelTag="Semester: "
                                selectID="semester"
                                options={["All", "1", "2", "3", "4", "5", "6", "7", "8"]}
                                value={semester}
                                onChange={setSemester}
                            />
                            <FilterFields
                                labelHTML="category"
                                labelTag="Category: "
                                selectID="category"
                                options={["All", "General", "OBC-NCL", "SC", "ST"]}
                                value={category}
                                onChange={setCategory}
                            />
                        </div>
                        <Button
                            type="submit"
                            className="rounded-xl text-lg bg-primary-color hover:bg-[#6235b1] text-nav-white outline-none focus:bg-gray-50 duration-200 w-[20%] my-4"
                            onClick={() => applyFilters(hostelFacility, academicSession, program, semester, category)}
                        >
                            Apply Filter
                        </Button>
                    </div>
                    {studentsData.length > 0 && <div className="overflow-x-auto hide-scrollbar">
                        <table border="1" className="min-w-full h-full border-collapse">
                            <thead>
                                <tr className="text-primary-color">
                                    <th
                                        className="bg-primary-light-color px-2 border border-heading-color min-w-[40px]">
                                        Serial Number
                                    </th>
                                    {columns.map((column, index) => (
                                        <th key={index}
                                            className="bg-primary-light-color px-2 border border-heading-color"
                                            style={{ minWidth: `${column.rowWidth || 110}px` }}
                                        >
                                            {column.label}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {studentsData.map((student, index) => (
                                    <tr
                                        key={student._id}
                                        className="text-center hover:text-primary-color"
                                    >
                                        <td className="px-2 py-2">{index + 1}</td>
                                        {columns.map((column, index) => (
                                            <td
                                                key={index}
                                                className="px-2 py-2"
                                            >
                                                {student[column.key]}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>}
                    {studentsData.length === 0 && <p>No data available</p>}
                </div>
            </div>
        </div>
    );
}

export default DashboardMain;