import React from "react";
import { AboutStore } from "./about/aboutStore";
import { CategoryStore } from "./category/categoryStore";
import { UploadedFileStore } from "./uploadedFile/uploadedFileStore";
import { AuthStore } from "./auth/authStore";
import { UserStore } from "./user/userStore";
import { FeatureStore } from "./feature/featureStore";

type RootStateContextValue = {
  aboutStore: AboutStore;
  categoryStore: CategoryStore;
  uploadedFileStore: UploadedFileStore;
  authStore: AuthStore;
  userStore: UserStore;
  featureStore: FeatureStore;
};

const RootStateContext = React.createContext<RootStateContextValue>(
  {} as RootStateContextValue
);
const aboutStore = new AboutStore();
const categoryStore = new CategoryStore();
const uploadedFileStore = new UploadedFileStore();
const authStore = new AuthStore();
const userStore = new UserStore();
const featureStore = new FeatureStore();

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
        featureStore,
      }}
    >
      {children}
    </RootStateContext.Provider>
  );
};

export const useRootStore = () => React.useContext(RootStateContext);
