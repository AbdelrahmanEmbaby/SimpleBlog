import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Register from "./pages/Register";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";

import { UserProvider } from "./hooks/useUserContext";
import {
  ProtectedRoutes,
  GuestOnlyRoutes,
  NeutralRoutes,
} from "./components/ProtectedRoutes";
import AuthInitializer from "./components/AuthInitializer";

function App() {
  return (
    <div className="font-['Poppins']">
      <UserProvider>
        <AuthInitializer>
          <BrowserRouter>
            <Routes>
              <Route element={<NeutralRoutes />}>
                <Route path="/" element={<Home />} />
              </Route>

              <Route element={<ProtectedRoutes />}>
                <Route path="/post/create" element={<CreatePost />} />
                <Route path="/post/edit/:id" element={<EditPost />} />
              </Route>

              <Route element={<GuestOnlyRoutes />}>
                <Route path="/signin" element={<Signin />} />
                <Route path="/register" element={<Register />} />
              </Route>

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </AuthInitializer>
      </UserProvider>
    </div>
  );
}

export default App;
