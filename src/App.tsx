import React from "react";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeContextProvider } from "./context/ThemeContext";
import ThemeProvider from "./providers/ThemeProvider";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import SinglePage from "./pages/singlePost/SinglePage";
import Login from "./pages/login/Login";
import Write from "./pages/write/Write";
import ContactPage from "./pages/contact/Contact";
import About from "./pages/about/About";

function App({ children }: any) {
  return (
    <ThemeContextProvider>
      <ThemeProvider>
        <div className="container">
          <div className="wrapper">
            <Router>
              <Navbar />
              <Routes>
                {children}
                <Route path="/" element={<Home />} />
                <Route path="/detail" element={<SinglePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/write" element={<Write />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/about" element={<About />} />
              </Routes>
              <Footer />
            </Router>
          </div>
        </div>
      </ThemeProvider>
    </ThemeContextProvider>
  );
}

export default App;
