import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Auth from "./components/Auth";
import { Toaster } from "sonner";
import "./App.css";
import { Provider } from "react-redux";
import store from "./app/store";
import UserDetails from "./components/UserDetails";

function App() {
  return (
    <Provider store={store}>
      <Toaster richColors position="top-center" />
      <Router>
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
