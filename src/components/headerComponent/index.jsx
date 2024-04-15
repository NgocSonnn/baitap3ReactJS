import React from "react";
import "../headerComponent/style.scss";
import { Button, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { useDispatch, useSelector } from "react-redux";
import {
  actFetchAllTask,
  setNewPage,
  setSearchKey,
} from "../../redux/features/tasks/taskSlice";

const HeaderComponents = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchKey = useSelector((state) => state.task.searchKey);
  const pagination = useSelector((state) => state.task.pagination);
  const handleReadirectAddTask = () => {
    navigate(ROUTES.ADD_NEW);
  };
  const handleSearchTask = (event) => {
    event.preventDefault();
    dispatch(
      actFetchAllTask({
        _page: 1,
        _per_page: pagination.limitPerpage,
        q: searchKey,
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
      <Button onClick={handleReadirectAddTask}>Create New Task</Button>
      <form
        className="header-container__search-area"
        onSubmit={handleSearchTask}
      >
        <Input
          placeholder="Please input search...."
          value={searchKey}
          onChange={handleChangeInputSearch}
        ></Input>
        <Button type="submit">Search</Button>
      </form>
    </div>
  );
};

export default HeaderComponents;
