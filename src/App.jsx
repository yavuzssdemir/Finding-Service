import { Route, Routes } from "react-router-dom";
import Footer from "./components/footer";
import Header from "./components/header";

import AboutUsPage from "./pages/about-us/about-us-page";
import ContactUsPage from "./pages/about-us/contact-us-page";
import PrivacyPolicyPage from "./pages/about-us/privacy-policy-page";
import VissionMissionPage from "./pages/about-us/vision-mission-page";

import LoginPage from "./pages/auth/login-page";
import RegisterPage from "./pages/auth/register-page";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useApi from "./hooks/useApi";
import CategoryDetailPage from "./pages/category-detail-page";
import MainPage from "./pages/main-page";
import UserDashboardPage from "./pages/user/user-dashboard-page";
import { setUser } from "./redux/authSlice";
import { setCategories } from "./redux/categorySlice";

function App() {
  const categoryState = useSelector((state) => state.categoryState);
  const authState = useSelector((state) => state.authState);

  console.warn("🔥 | categoryState:", categoryState);
  const api = useApi();
  const dispatch = useDispatch();

  useEffect(() => {
    
    (async () => {
      

      console.warn(
        "🔥 | useEffect içerisindeki immediate call function çalıştı."
      );

      const response = await api.get("public/categories/listMainCategories");
      console.warn("🔥 | api response:", response);

      

      dispatch(setCategories(response.data.data));

      
      console.log("App authState", authState);

      if (authState.token && !authState.user) {
        const userResponse = await api.get("user/appData");
        console.log("🔥 | App.jsx > userResponse:", userResponse);
        dispatch(setUser(userResponse.data.data.user));
      }
    })();
  }, []);


  return (
    <div className="container py-3">
      <Header />
      <Routes>
        <Route index element={<MainPage />} />

        <Route path="/auth">
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>

        <Route path="/user">
          <Route index element={<UserDashboardPage />} />
        </Route>

        <Route path="/category/:slug" element={<CategoryDetailPage />} />

        <Route path="/about-us">
          <Route index element={<AboutUsPage />} />
          <Route path="vision-mission" element={<VissionMissionPage />} />
          <Route path="contact-us" element={<ContactUsPage />} />
          <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;