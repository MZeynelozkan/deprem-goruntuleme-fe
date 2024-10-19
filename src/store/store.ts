import { configureStore } from "@reduxjs/toolkit";
import searchSliceReducer from "@/slices/searchSlice";
import dataSliceReducer from "@/slices/dataSlice";
import postNewDataSliceReducer from "@/slices/postNewDataSlice";

const store = configureStore({
  reducer: {
    search: searchSliceReducer,
    data: dataSliceReducer,
    postData: postNewDataSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store; // store'un default olarak export edilmesi
