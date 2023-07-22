import "../style/navBar.css";
import { Link } from "react-router-dom";

function Logo() {
	return (<Link to="/" className="logo">Logo</Link>);
};

function Nav() {
	return (

		<div className="nav">
			<Logo />
			<nav>
				<Link className="link" to="about">About</Link>
				<Link className="link" to="contact">Contact</Link>
			</nav>
		</div>

	);
};

export default Nav;