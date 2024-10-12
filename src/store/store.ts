import { configureStore } from "@reduxjs/toolkit";
import searchSliceReducer from "@/slices/searchSlice";
import dataSliceReducer from "@/slices/dataSlice";

const store = configureStore({
  reducer: {
    search: searchSliceReducer,
    data: dataSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store; // store'un default olarak export edilmesi
