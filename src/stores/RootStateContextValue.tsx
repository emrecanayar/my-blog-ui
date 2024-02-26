import React from "react";
import { AboutStore } from "./about/aboutStore";
import { CategoryStore } from "./category/categoryStore";
import { UploadedFileStore } from "./uploadedFile/uploadedFileStore";
import { AuthStore } from "./auth/authStore";
import { UserStore } from "./user/userStore";

type RootStateContextValue = {
  aboutStore: AboutStore;
  categoryStore: CategoryStore;
  uploadedFileStore: UploadedFileStore;
  authStore: AuthStore;
  userStore: UserStore;
};

const RootStateContext = React.createContext<RootStateContextValue>(
  {} as RootStateContextValue
);
const aboutStore = new AboutStore();
const categoryStore = new CategoryStore();
const uploadedFileStore = new UploadedFileStore();
const authStore = new AuthStore();
const userStore = new UserStore();

export const RootStateProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  return (
    <RootStateContext.Provider
      value={{
        aboutStore,
        categoryStore,
        uploadedFileStore,
        authStore,
        userStore,
      }}
    >
      {children}
    </RootStateContext.Provider>
  );
};

export const useRootStore = () => React.useContext(RootStateContext);
