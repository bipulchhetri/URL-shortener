import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
// import LinksTable from "./components/LinksTable";

 import Analytics from "./components/Analytics"
import Link from "./components/Link";
// import PopupForm from "./components/PopupForm";
import Pop from "./Pages/Pop";



const App = () => {
  return (
  <>
 
  <Router>
      <Navbar />
      <Routes>
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/analytics" element={<Analytics/>} />
        <Route path="/link" element={ <Link/>} />
      

      </Routes>


     
      {/* <TableRow/> */}
    </Router>

   
  </>
    
  );
};

export default App;
