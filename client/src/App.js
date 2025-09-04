import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getMe } from "./state/auth/thunks";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Sheet from "./pages/Sheet";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";

function App() {
  const { user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);
  if (loading) {
    return (
      <div
        style={{ textAlign: "center", marginTop: "4rem", fontSize: "1.2rem" }}
      >
        Loading...
      </div>
    );
  }
  return (
    <Router>
      {user && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/sheet"
          element={user ? <Sheet /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={user ? <Profile /> : <Navigate to="/login" />}
        />
        <Route
          path="*"
          element={<Navigate to={user ? window.location.pathname : "/login"} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
