import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./pages/nav/nav";
import Home from "./pages/home/home";
import Footer from "./pages/nav/footer/footer";
import Landing from "./pages/landing/landing";
import "./App.css";
import Rules from "./pages/rules/rules";
import PrivateComponent from "./components/privateComponent";

function App() {
  return (
    <div class="grid h-screen grid-rows-[auto_1fr_auto]">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="" element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="Rules" element={<Rules />} />
          </Route>
          <Route path="*" element={<h1>Page Not Found</h1>} />
          <Route path="login" element={<Landing />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
