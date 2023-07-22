import { Link } from "react-router-dom";
import "../style/error404.css";

function NotFoundMsg() {
	return (

		<div className="not-found">
			<h3>Error 404</h3>
			<p>Page not found<br />check the url or back to the <Link className="link" to="/">Home</Link></p>
		</div>

	);
}

export default NotFoundMsg;