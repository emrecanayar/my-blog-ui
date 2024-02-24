import React from "react";
import { AboutStore } from "./about/aboutStore";
import { CategoryStore } from "./category/categoryStore";
import { UploadedFileStore } from "./uploadedFile/uploadedFileStore";

type RootStateContextValue = {
  aboutStore: AboutStore;
  categoryStore: CategoryStore;
  uploadedFileStore: UploadedFileStore;
};

const RootStateContext = React.createContext<RootStateContextValue>(
  {} as RootStateContextValue
);
const aboutStore = new AboutStore();
const categoryStore = new CategoryStore();
const uploadedFileStore = new UploadedFileStore();

export const RootStateProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  return (
    <RootStateContext.Provider
      value={{ aboutStore, categoryStore, uploadedFileStore }}
    >
      {children}
    </RootStateContext.Provider>
  );
};

export const useRootStore = () => React.useContext(RootStateContext);
