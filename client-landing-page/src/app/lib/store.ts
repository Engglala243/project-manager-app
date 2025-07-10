import { configureStore, ReturnType } from "@reduxjs/toolkit";
import projectsReducer from "./slices/projectsSlice";
import clientsReducer from "./slices/clientsSlice";
import contactReducer from "./slices/contactSlice";
import newsletterReducer from "./slices/newsletterSlice";

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    clients: clientsReducer,
    contact: contactReducer,
    newsletter: newsletterReducer,
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
