import React from "react";
import "../mainContentTask/style.scss";
import Task from "../task";

const MainContentTask = (props) => {
  const renderTask = (tasks) => {
    return tasks.map((task) => {
      return <Task key={task.id} task={task}></Task>;
    });
  };
  return <div className="main-content-task">{renderTask(props.tasks)}</div>;
};

export default MainContentTask;
