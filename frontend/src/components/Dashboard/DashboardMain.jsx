import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

const DashboardMain = () => {
    return (
        <div className="w-full h-full">
            <Header />
            <div className="flex">
                <Sidebar  />
                <div className="flex-1 p-4">
                    Main Content
                </div>
            </div>
        </div>
    );
}

export default DashboardMain;