import React from "react";
import "../headerComponent/style.scss";
import { Button, Input } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { useDispatch, useSelector } from "react-redux";
import {
  actFetchAllTask,
  setNewPage,
  setSearchKey,
} from "../../redux/features/tasks/taskSlice";
import { TASK_STATUS } from "../../constants/task.constant";

const HeaderComponents = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchKey = useSelector((state) => state.task.searchKey);
  const pagination = useSelector((state) => state.task.pagination);
  const location = useLocation();

  const handleRedirectAddTask = () => {
    navigate(ROUTES.ADD_NEW);
  };
  const computedCurrentStatusSearch = (pathName) => {
    switch (pathName) {
      case "/all-task":
        return "";
      case "/new-task":
        return TASK_STATUS.NEW;
      case "/doing-task":
        return TASK_STATUS.DOING;
      case "/done-task":
        return TASK_STATUS.DONE;

      default:
        return "";
    }
  };
  const handleSearchTask = (event) => {
    event.preventDefault();

    const statusSearch = computedCurrentStatusSearch(location.pathname);
    dispatch(
      actFetchAllTask({
        _page: 1,
        _limit: pagination.limitPerpage,
        q: searchKey,
        ...(!!statusSearch ? { status: statusSearch } : {}),
      })
    );
    dispatch(setNewPage(1));
  };
  const handleChangeInputSearch = (event) => {
    const value = event.target.value;
    dispatch(setSearchKey(value));
  };
  return (
    <div className="header-container">
      <Button onClick={handleRedirectAddTask}>Create New Task</Button>
      <form
        className="header-container__search-area"
        onSubmit={handleSearchTask}
      >
        <Input
          placeholder="Please input search...."
          value={searchKey}
          onChange={handleChangeInputSearch}
        ></Input>
        <button
          className="header-container__search-btn"
          onClick={handleSearchTask}
          type="submit"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default HeaderComponents;
