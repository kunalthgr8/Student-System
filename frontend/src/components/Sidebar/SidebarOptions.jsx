const SidebarOptions = ({
    optionsIcon: Icon,
    optionsText,
    optionsClass = "flex gap-2 items-center justify-start p-4 m-2 rounded-2xl cursor-pointer transitions duration-250",
    onClick,
    selected,
}) => {
    return (
        <div
            className={`${optionsClass} ${
                selected
                    ? "bg-primary-light-color text-primary-color"
                    : "hover:bg-primary-light-color hover:text-primary-color"
            }`}
            onClick={onClick}
        >
            {Icon && <Icon className="text-2xl" />}
            <span className="font-medium">{optionsText}</span>
        </div>
    );
};

export default SidebarOptions;
