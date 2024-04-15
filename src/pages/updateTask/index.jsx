import React, { useEffect } from "react";
import TaskForm from "../../components/taskForm";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { actFetchTaskById } from "../../redux/features/tasks/taskSlice";

const UpdateTask = () => {
  const task = useSelector((state) => state.task.currenTask);
  const dispatch = useDispatch();
  const params = useParams();
  useEffect(() => {
    dispatch(actFetchTaskById(params.id));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return (
    <div>
      <TaskForm isEdit={true} currenTask={task}></TaskForm>
    </div>
  );
};

export default UpdateTask;
