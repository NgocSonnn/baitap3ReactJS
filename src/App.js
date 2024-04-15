import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/mainLayout";
import AllTasks from "./pages/allTasks";
import { ROUTES } from "./constants/routes";
import NewTasks from "./pages/newTasks";
import DoingTasks from "./pages/doingTasks";
import DoneTasks from "./pages/doneTasks";
import AddNewTask from "./pages/addNewTask";
import UpdateTask from "./pages/updateTask";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout></MainLayout>}>
            <Route index element={<AllTasks></AllTasks>}></Route>
            <Route
              path={ROUTES.ALL_TASK}
              element={<AllTasks></AllTasks>}
            ></Route>
            <Route
              path={ROUTES.UPDATE_TASK}
              element={<UpdateTask></UpdateTask>}
            ></Route>
            <Route
              path={ROUTES.NEW_TASK}
              element={<NewTasks></NewTasks>}
            ></Route>
            <Route
              path={ROUTES.DOING_TASK}
              element={<DoingTasks></DoingTasks>}
            ></Route>
            <Route
              path={ROUTES.DONE_TASK}
              element={<DoneTasks></DoneTasks>}
            ></Route>{" "}
            <Route
              path={ROUTES.ADD_NEW}
              element={<AddNewTask></AddNewTask>}
            ></Route>
          </Route>
          <Route
            path={"/"}
            element={<Navigate to={ROUTES.ALL_TASK}></Navigate>}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
