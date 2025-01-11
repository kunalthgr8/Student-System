import { useEffect, useState } from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

const DashboardMain = () => {

    const [studentsData, setStudentsData] = useState([]);
    const [loading, setLoading] = useState(true);

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


    if (loading) return <p>Loading...</p>;

    return (
        <div className="w-full h-full">
            <Header />
            <div className="flex">
                <Sidebar selected="Dashboard" />
                <div
                    className="flex-1 flex-col p-4 relative text-center items-center justify-center"
                    style={{ maxWidth: "calc(100% - 16rem)", left: "16rem", height: "calc(100vh - 5rem)" }}
                >
                    <h1 className="text-2xl font-bold m-4 text-primary-color">Student Details</h1>
                    <div className="overflow-x-auto hide-scrollbar">
                        <table border="1" className="min-w-full h-full border-collapse">
                            <thead>
                                <tr className="text-primary-color">
                                    <th className="bg-primary-light-color px-2 border border-heading-color min-w-[40px]">Serial Number</th>
                                    <th className="bg-primary-light-color px-2 border border-heading-color min-w-[100px]">Availing Hostel Facility</th>
                                    <th className="bg-primary-light-color px-2 border border-heading-color min-w-[120px]">ID Number</th>
                                    <th className="bg-primary-light-color px-2 border border-heading-color min-w-[200px]">Name of the Candidate</th>
                                    <th className="bg-primary-light-color px-2 border border-heading-color min-w-[120px]">Academic Session</th>
                                    <th className="bg-primary-light-color px-2 border border-heading-color min-w-[120px]">Program</th>
                                    <th className="bg-primary-light-color px-2 border border-heading-color min-w-[120px]">Semester</th>
                                    <th className="bg-primary-light-color px-2 border border-heading-color min-w-[120px]">Category</th>
                                    <th className="bg-primary-light-color px-2 border border-heading-color min-w-[120px]">Admission Fee</th>
                                    <th className="bg-primary-light-color px-2 border border-heading-color min-w-[120px]">ID Card and Certificates Fee</th>
                                    <th className="bg-primary-light-color px-2 border border-heading-color min-w-[120px]">Library Fee</th>
                                    <th className="bg-primary-light-color px-2 border border-heading-color min-w-[120px]">Celebration Fee</th>
                                    <th className="bg-primary-light-color px-2 border border-heading-color min-w-[120px]">Training & Placement Fee</th>
                                    <th className="bg-primary-light-color px-2 border border-heading-color min-w-[120px]">Alumni Life Membership</th>
                                    <th className="bg-primary-light-color px-2 border border-heading-color min-w-[120px]">Caution Money Deposite</th>
                                    <th className="bg-primary-light-color px-2 border border-heading-color min-w-[120px]">Registration Fee</th>
                                    <th className="bg-primary-light-color px-2 border border-heading-color min-w-[120px]">Tuition Fee</th>
                                    <th className="bg-primary-light-color px-2 border border-heading-color min-w-[120px]">CoSA Fee</th>
                                    <th className="bg-primary-light-color px-2 border border-heading-color min-w-[120px]">Health Facility Charges</th>
                                    <th className="bg-primary-light-color px-2 border border-heading-color min-w-[120px]">Other Fee</th>
                                    <th className="bg-primary-light-color px-2 border border-heading-color min-w-[120px]">Student Welfare Fund (Not Fee)</th>
                                    <th className="bg-primary-light-color px-2 border border-heading-color min-w-[120px]">Insurance Premium</th>
                                    <th className="bg-primary-light-color px-2 border border-heading-color min-w-[120px]">Hostel Admission Fee</th>
                                    <th className="bg-primary-light-color px-2 border border-heading-color min-w-[120px]">Hostel License Fee</th>
                                    <th className="bg-primary-light-color px-2 border border-heading-color min-w-[120px]">Hostel and Mess Establishment Charges</th>
                                    <th className="bg-primary-light-color px-2 border border-heading-color min-w-[120px]">Dinning Charges</th>
                                    <th className="bg-primary-light-color px-2 border border-heading-color min-w-[120px]">Gross Total Fee</th>
                                    <th className="bg-primary-light-color px-2 border border-heading-color min-w-[120px]">Fee Waiver</th>
                                    <th className="bg-primary-light-color px-2 border border-heading-color min-w-[120px]">Seat Booking/ Dining Fee Adjustment</th>
                                    <th className="bg-primary-light-color px-2 border border-heading-color min-w-[120px]">Payable Fee</th>
                                </tr>
                            </thead>
                            <tbody>
                                {studentsData.map((student) => (
                                    <tr key={student._id} className="text-center hover:text-primary-color">
                                        <td className="px-2 py-2">{student.S.N[""]}</td>
                                        <td className="px-2 py-2">{student["Availing Hostel Facility"]}</td>
                                        <td className="px-2 py-2">{student["ID Number"]}</td>
                                        <td className="px-2 py-2">{student["Name of the Candidate"]}</td>
                                        <td className="px-2 py-2">{student["Academic Session"]}</td>
                                        <td className="px-2 py-2">{student["Program"]}</td>
                                        <td className="px-2 py-2">{student["Semester"]}</td>
                                        <td className="px-2 py-2">{student["Category"]}</td>
                                        <td className="px-2 py-2">{student["Admission Fee"]}</td>
                                        <td className="px-2 py-2">{student["ID Card and Certificates Fee"]}</td>
                                        <td className="px-2 py-2">{student["Library Fee"]}</td>
                                        <td className="px-2 py-2">{student["Celebration Fee"]}</td>
                                        <td className="px-2 py-2">{student["Training & Placement Fee"]}</td>
                                        <td className="px-2 py-2">{student["Alumni Life Membership"]}</td>
                                        <td className="px-2 py-2">{student["Caution Money Deposite"]}</td>
                                        <td className="px-2 py-2">{student["Registration Fee"]}</td>
                                        <td className="px-2 py-2">{student["Tuition Fee"]}</td>
                                        <td className="px-2 py-2">{student["CoSA Fee"]}</td>
                                        <td className="px-2 py-2">{student["Health Facility Charges"]}</td>
                                        <td className="px-2 py-2">{student["Other Fee"]}</td>
                                        <td className="px-2 py-2">{student["Student Welfare Fund (Not Fee)"]}</td>
                                        <td className="px-2 py-2">{student["Insurance Premium"]}</td>
                                        <td className="px-2 py-2">{student["Hostel Admission Fee"]}</td>
                                        <td className="px-2 py-2">{student["Hostel License Fee"]}</td>
                                        <td className="px-2 py-2">{student["Hostel and Mess Establishment Charges"]}</td>
                                        <td className="px-2 py-2">{student["Dinning Charges"]}</td>
                                        <td className="px-2 py-2">{student["Gross Total Fee"]}</td>
                                        <td className="px-2 py-2">{student["Fee Waiver"]}</td>
                                        <td className="px-2 py-2">{student["Seat Booking/ Dining Fee Adjustment"]}</td>
                                        <td className="px-2 py-2">{student["Payable Fee"]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default DashboardMain;