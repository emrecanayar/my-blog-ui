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
import { TagStore } from "./tag/tagStore";
import { FooterStore } from "./footer/footerStore";
import { SubscriptionStore } from "./subscription/subscriptionStore";
import { RatingStore } from "./rating/ratingStore";
import { NotificationStore } from "./notification/notificationStore";
import { FavoriteArticleStore } from "./favoriteArticle/favoriteArticleStore";
import { LikeStore } from "./like/likeStore";

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
  headArticleFeature: HeadArticleFeatureStore;
  tagStore: TagStore;
  footerStore: FooterStore;
  subscriptionStore: SubscriptionStore;
  ratingStore: RatingStore;
  notificationStore: NotificationStore;
  favoriteArticleStore: FavoriteArticleStore;
  likeStore:LikeStore
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
const tagStore = new TagStore();
const footerStore = new FooterStore();
const subscriptionStore = new SubscriptionStore();
const ratingStore = new RatingStore();
const notificationStore = new NotificationStore();
const favoriteArticleStore = new FavoriteArticleStore();
const likeStore = new LikeStore();

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
        headArticleFeature,
        tagStore,
        footerStore,
        subscriptionStore,
        ratingStore,
        notificationStore,
        favoriteArticleStore,
        likeStore
      }}
    >
      {children}
    </RootStateContext.Provider>
  );
};

export const useRootStore = () => React.useContext(RootStateContext);
