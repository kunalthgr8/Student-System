import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

const DashboardMain = () => {
    return (
        <div className="w-full h-full">
            <Header />
            <div className="flex">
                <Sidebar selected="Dashboard" />
                Main content
            </div>
        </div>
    );
}

export default DashboardMain;