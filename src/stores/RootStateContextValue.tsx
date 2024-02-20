import React from "react";
import { AboutStore } from "./about/aboutStore";
import { CategoryStore } from "./category/categoryStore";

type RootStateContextValue = {
  aboutStore: AboutStore;
  categoryStore: CategoryStore;
};

const RootStateContext = React.createContext<RootStateContextValue>(
  {} as RootStateContextValue
);
const aboutStore = new AboutStore();
const categoryStore = new CategoryStore();

export const RootStateProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  return (
    <RootStateContext.Provider value={{ aboutStore, categoryStore }}>
      {children}
    </RootStateContext.Provider>
  );
};

export const useRootStore = () => React.useContext(RootStateContext);
