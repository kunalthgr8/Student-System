const SidebarOptions = ({ optionsIcon: Icon, optionsText, optionsClass = "flex gap-2 items-center justify-start p-4 m-2 hover:bg-primary-light-color hover:text-primary-color rounded-2xl cursor-pointer transitions duration-250" }) => {
    return (
        <div className={optionsClass}>
            {Icon && <Icon className="text-2xl" />}
            <span className="font-medium">{optionsText}</span>
        </div>
    );
}

export default SidebarOptions;