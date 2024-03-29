import "./App.css";
import store from "./app/store";
import { Toaster } from "sonner";
import Home from "./components/Home";
import Auth from "./components/Auth";
import Login from "./components/Login";
import { Provider } from "react-redux";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import UserDetails from "./components/UserDetails";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <Toaster richColors position="top-center" />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/signup" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route element={<Auth />}>
            <Route path="/" element={<Home />} />
            <Route path="/user-details" element={<UserDetails />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
