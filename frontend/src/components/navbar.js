import { BrowserRouter, Link, Routes } from "react-router-dom"
import "../CSS/Navbar.css"; 

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