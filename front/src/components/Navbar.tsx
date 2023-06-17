import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

const Navbar = (props: {
	hiddenMenu: boolean;
	setHiddenMenu: React.Dispatch<React.SetStateAction<boolean>>;
}) => {

    const navigate = useNavigate()

	return (
		<div className="navbar">
			<button
            className="btn"
            onClick={()=> navigate('/')}
            >
                Home
            </button>
			<button
				onClick={() => props.setHiddenMenu((prev) => !prev)
                }
				className="btn btn-sidebar"
			>
				|||
			</button>
			<div className={`hidden-menu ${props.hiddenMenu ? 'hidden-menu-hide' : 'hidden-menu-show'}`}>
                <Sidebar/>
            </div>
		</div>
	);
};

export default Navbar;
