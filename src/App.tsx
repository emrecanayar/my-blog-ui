import React, { useEffect } from "react";
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
import "react-toastify/dist/ReactToastify.css";
import authStore from "./stores/auth/authStore";
import userStore from "./stores/user/userStore";
import PrivateRoute from "./utils/PrivateRoute";

function App({ children }: any) {
  useEffect(() => {
    authStore.initializeAuthState();
    if (authStore.isAuthenticated) {
      userStore.getFromAuth();
    }
  }, []);
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
                <Route path="/detail/:id" element={<SinglePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/write" element={
                  <PrivateRoute>
                    <Write />
                  </PrivateRoute>
                } />
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
