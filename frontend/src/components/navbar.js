import { BrowserRouter, Link, Routes } from "react-router-dom"
import "../CSS/Navbar.css"; // Import the CSS file

const Navbar =()=>{

    return(
        <nav>
            <div className="container">
            <Link to="/GPAfront"> <h3> Calculate My GPA </h3></Link>

            </div>
        </nav>
    )
}

export default Navbar