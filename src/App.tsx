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
import CategoryArticleList from "./pages/categoryArticleList/CategoryArticleList";
import UserArticleList from "./pages/userArticleList/UserArticleList";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import Account from "./components/account/Account";
import UserFavoriteList from "./pages/userFavoriteList/UserFavoriteList";
import Trending from "./pages/trending/Trending";

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
                <Route path="/register" element={<Register />} />
                <Route
                  path="/write"
                  element={
                    <PrivateRoute>
                      <Write />
                    </PrivateRoute>
                  }
                />
                <Route path="/category/:id" element={<CategoryArticleList />} />
                <Route path="/myarticles/:id" element={<UserArticleList />} />
                <Route
                  path="/myfavoritearticles"
                  element={<UserFavoriteList />}
                />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/about" element={<About />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile/account" element={<Account />} />
                <Route path="trending" element={<Trending />} />
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
