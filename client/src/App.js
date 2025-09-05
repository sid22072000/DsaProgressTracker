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
import Loader from "./components/Loader";
import Register from "./pages/Register";
import Sheet from "./pages/Sheet";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";

function App() {
  const { user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [checkedAuth, setCheckedAuth] = React.useState(false);
  const [initialPath, setInitialPath] = React.useState(
    window.location.pathname
  );

  useEffect(() => {
    setInitialPath(window.location.pathname);
    dispatch(getMe()).finally(() => setCheckedAuth(true));
  }, [dispatch]);

  if (!checkedAuth || loading) {
    return <Loader />;
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
          element={
            user ? <Navigate to={initialPath} /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
