import { configureStore, ReturnType } from "@reduxjs/toolkit";
import projectsReducer from "./slices/projectsSlice";
import clientsReducer from "./slices/clientsSlice";
import contactsReducer from "./slices/contactsSlice";
import subscribersReducer from "./slices/subscribersSlice";

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    clients: clientsReducer,
    contacts: contactsReducer,
    subscribers: subscribersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
