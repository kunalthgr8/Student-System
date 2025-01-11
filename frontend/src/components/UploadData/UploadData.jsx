import { useState } from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import { MdCloudUpload } from "react-icons/md";
import axios from "axios";


const UploadData = () => {

    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");

    const handleFileChange = (e) => {
        e.preventDefault();
        setFile(e.target.files[0]);
    }

    const handleUpload = async () => {
        if (!file) {
            setMessage("Please select a file first.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post("http://localhost:8000/api/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setMessage(response.data.message || "File uploaded successfully.");
        } catch (error) {
            setMessage("File upload failed. Please try again.");
            console.error(error);
        }
    };

    return (
        <div className="w-full h-full">
            <Header />
            <div className="flex">
                <Sidebar selected="Upload Data" />
                <div
                    className="flex-1 p-4 relative text-center flex items-center justify-center"
                    style={{ maxWidth: "calc(100% - 16rem)", left: "16rem", height: "calc(100vh - 5rem)" }}
                >
                    <div className="m-auto flex flex-col items-center justify-center w-[100%]">
                        <MdCloudUpload className="m-auto text-5xl text-primary-color" />
                        <p className="text-2xl font-bold">Upload Files</p>
                        <p className="font-medium text-nav-active">( File type shoule be .csv and .xlsx only )</p>
                        <input
                            type="file"
                            accept=".csv, .xlsx"
                            onChange={handleFileChange}
                            className="text-xl pl-20 text-primary-color font-sans file:text-primary-color file:font-sans file:font-semibold file:px-2 file:py-1 file:cursor-pointer file:m-4 file:bg-primary-light-color file:border file:border-primary-color file:rounded-md"
                        />
                        <button
                            className="text-primary-color text-xl font-sans font-semibold bg-primary-light-color p-2 m-4 rounded-md border border-primary-color"
                            onClick={handleUpload}
                        >
                            Upload from Device
                        </button>
                        {message && <p className="mt-4">{message}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UploadData;