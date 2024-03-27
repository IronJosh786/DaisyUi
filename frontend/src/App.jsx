import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Auth from "./components/Auth";
import { Toaster } from "sonner";
import "./App.css";

function App() {
  return (
    <>
      <Toaster richColors position="top-center" />
      <Router>
        <Routes>
          <Route path="/signup" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Auth />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
