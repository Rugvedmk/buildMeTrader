import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./pages/nav/nav";
import Home from "./pages/home/home";
import Footer from "./pages/nav/footer/footer";
import "./App.css";

function App() {
  return (
    <div class="grid h-screen grid-rows-[auto_1fr_auto]">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="strategies" element={<h1>Strategies</h1>} />
          <Route path="Rules" element={<h1>Rules</h1>} />
          <Route path="Mistakes" element={<h1>Mistakes</h1>} />
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
