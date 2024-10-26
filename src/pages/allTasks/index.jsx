import React, { useEffect } from "react";
import MainContentTask from "../../components/mainContentTask";
import { useDispatch, useSelector } from "react-redux";
import {
  actFetchAllTask,
  setNewPage,
} from "../../redux/features/tasks/taskSlice";
import { Pagination, Spin } from "antd";

const AllTasks = () => {
  const dispatch = useDispatch();
  const { isLoading, tasks, pagination, searchKey } = useSelector(
    (state) => state.task
  );
  useEffect(() => {
    dispatch(
      actFetchAllTask({
        _page: 1,
        _limit: pagination.limitPerpage,
        q: searchKey,
      })
    );
    return () => {
      dispatch(setNewPage(1));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangePage = (newPage) => {
    dispatch(setNewPage(newPage));
    dispatch(
      actFetchAllTask({
        _page: newPage,
        _limit: pagination.limitPerpage,
        q: searchKey,
      })
    );
  };
  if (isLoading) {
    return <Spin></Spin>;
  }

  return (
    <div>
      {tasks.length === 0 ? (
        <div>No tasks</div>
      ) : (
        <>
          <MainContentTask tasks={tasks}></MainContentTask>
          <Pagination
            style={{ paddingTop: "10px" }}
            defaultPageSize={pagination.limitPerpage}
            current={pagination.currentPage}
            total={pagination.total}
            onChange={handleChangePage}
          ></Pagination>
        </>
      )}
    </div>
  );
};

export default AllTasks;
