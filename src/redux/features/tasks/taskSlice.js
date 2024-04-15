import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TaskAPIs } from "../../../apis/taskApis";
import { message } from "antd";

const initialSate = {
  isLoading: false,
  tasks: [],
  currenTask: {},
  errors: {},
  pagination: {
    currentPage: 1,
    limitPerpage: 8,
    total: 8,
  },
  searchKey: "",
};

export const actFetchAllTask = createAsyncThunk(
  "tasks/fetchAllTask",
  async (params = {}) => {
    const response = await TaskAPIs.getAllTasks(params);

    return response.data;
  }
);

export const actFetchTaskById = createAsyncThunk(
  "tasks/fetchTaskById",
  async (taskId) => {
    const task = await TaskAPIs.getTaskById(taskId);
    return task;
  }
);
export const actUpdateTaskById = createAsyncThunk(
  "tasks/updateTaskById",
  async ({ id, taskUpdate }) => {
    await TaskAPIs.updateTaskById(id, taskUpdate);
    return null;
  }
);

export const actDeleteTaskById = createAsyncThunk(
  "task/deleteTaskById",
  async (id) => {
    await TaskAPIs.deleteTaskById(id);
    return null;
  }
);
const taskSlice = createSlice({
  name: "tasks",
  initialState: initialSate,
  reducers: {
    actSetTasks: (state, action) => {},
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    resetCurrenTask: (state, action) => {
      state.currenTask = {};
    },
    setNewPage: (state, action) => {
      state.pagination = {
        ...state.pagination,
        currentPage: action.payload,
      };
    },
    setSearchKey: (state, action) => {
      state.searchKey = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actFetchAllTask.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(actFetchAllTask.rejected, (state, action) => {
      state.errors = {};
      state.isLoading = false;
    });
    builder.addCase(actFetchAllTask.fulfilled, (state, action) => {
      const response = action.payload;
      const { data } = response.data;
      state.tasks = data;
      state.isLoading = false;
      state.pagination.total = response.data.items;
    });
    builder.addCase(actFetchTaskById.fulfilled, (state, action) => {
      state.currenTask = action.payload;
    });
    builder.addCase(actUpdateTaskById.fulfilled, (state, action) => {
      message.success("Cập nhật thành công!!");
    });
    builder.addCase(actDeleteTaskById.fulfilled, (state, action) => {
      message.success("Xoá thành công!!");
    });
  },
});
export const actCreateNewTask = (task) => {
  return async (dispatch) => {
    try {
      await TaskAPIs.createTask(task);
      dispatch(actFetchAllTask());
    } catch (error) {}
  };
};

export const { actSetTasks, setLoading, setNewPage, setSearchKey } =
  taskSlice.actions;
export const taskReducer = taskSlice.reducer;
