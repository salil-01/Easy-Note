import { Route, Routes } from "react-router-dom";
import { NotFound } from "../components/NotFound";
import { CreateNote } from "./CreateNote";
import { EditNote } from "./EditNote";
import { Homepage } from "./Homepage";
import { Login } from "./Login";
import { Notes } from "./Notes";
import { PrivateRoute } from "./PrivateRoute";
import { Signup } from "./SignUp";

export const AllRoutes = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Homepage />} />
      {/* <Route path={"/about"} element={<About />} /> */}
      <Route path={"/login"} element={<Login />} />
      <Route path={"/signup"} element={<Signup />} />
      <Route
        path={"/notes"}
        element={
          <PrivateRoute>
            <Notes />
          </PrivateRoute>
        }
      />
      <Route
        path={"/edit/:id"}
        element={
          <PrivateRoute>
            <EditNote />
          </PrivateRoute>
        }
      />
      <Route
        path="/create"
        element={
          <PrivateRoute>
            <CreateNote />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
