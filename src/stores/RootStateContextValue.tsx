import React from "react";
import { AboutStore } from "./about/aboutStore";
import { CategoryStore } from "./category/categoryStore";
import { UploadedFileStore } from "./uploadedFile/uploadedFileStore";
import { AuthStore } from "./auth/authStore";
import { UserStore } from "./user/userStore";
import { FeatureStore } from "./feature/featureStore";
import { ArticleStore } from "./article/articleStore";
import { CommentStore } from "./comment/commentStore";
import { ContactStore } from "./contact/contactStore";
import { ContactUsInformationStore } from "./contactUsInformation/contactUsInformationStore";
import { EditorArticlePickStore } from "./editorArticlePick/editorArticlePickStore";
import { HeadArticleFeatureStore } from "./headArticleFeature/headArticleFeatureStore";

type RootStateContextValue = {
  aboutStore: AboutStore;
  categoryStore: CategoryStore;
  uploadedFileStore: UploadedFileStore;
  authStore: AuthStore;
  userStore: UserStore;
  featureStore: FeatureStore;
  articleStore: ArticleStore;
  commentStore: CommentStore;
  contactStore: ContactStore;
  contactUsInformation: ContactUsInformationStore;
  editorArticlePick: EditorArticlePickStore;
  feature: FeatureStore;  
  headArticleFeature : HeadArticleFeatureStore;
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
const articleStore = new ArticleStore();
const commentStore = new CommentStore();
const contactStore = new ContactStore();
const contactUsInformation = new ContactUsInformationStore();
const editorArticlePick = new EditorArticlePickStore();
const feature = new FeatureStore();
const headArticleFeature = new HeadArticleFeatureStore();

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
        articleStore,
        commentStore,
        contactStore,
        contactUsInformation,
        editorArticlePick,
        feature,
        headArticleFeature
      }}
    >
      {children}
    </RootStateContext.Provider>
  );
};

export const useRootStore = () => React.useContext(RootStateContext);
