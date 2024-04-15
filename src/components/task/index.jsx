import React from "react";
import "../task/style.scss";
import { generatePath, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

const Task = (props) => {
  const navigate = useNavigate();
  const handleRedirectToDetailPage = () => {
    const taskId = props.task.id;
    navigate(generatePath(ROUTES.UPDATE_TASK, { id: taskId }));
  };
  return (
    <div className="task-container">
      <div
        className="task-container__title"
        onClick={handleRedirectToDetailPage}
      >
        Title: {props.task.title}
      </div>
      <div className="task-container__author">
        Creator: {props.task.creator}
      </div>
      <div className="task-container__status">Status: {props.task.status}</div>
      <div className="task-container__divider"></div>
      <div className="task-container__decription">
        <div className="task-container__des-title">Decription: </div>
        <div className="task-container__des-content">
          {props.task.description}
        </div>
      </div>
    </div>
  );
};

export default Task;
