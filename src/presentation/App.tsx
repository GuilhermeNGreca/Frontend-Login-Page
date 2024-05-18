import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login/index";
import { Profile } from "./pages/Profile";
import "./theme/index.scss";

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};
