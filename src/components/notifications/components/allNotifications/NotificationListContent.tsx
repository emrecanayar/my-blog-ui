import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import NotificationCommentListContent from "../comment/NotificationCommentListContent";
import NotificationLikeListContent from "../like/NotificationLikeListContent";
import NotificationSubscriptionListContent from "../subscription/NotificationSubscriptionListContent";

interface NotificationListContentProps {}

const NotificationListContent = forwardRef(
  (props: NotificationListContentProps, ref) => {
    const [showComments, setShowComments] = useState(true);
    const [showLikes, setShowLikes] = useState(true);
    const [showSubscriptions, setShowSubscriptions] = useState(true);
    type NotificationComponentRef = {
      reloadData: () => void;
    };
    const commentListRef = useRef<NotificationComponentRef>(null);
    const likeListRef = useRef<NotificationComponentRef>(null);
    const subscriptionListRef = useRef<NotificationComponentRef>(null);

    useImperativeHandle(ref, () => ({
      reloadData() {
        commentListRef.current?.reloadData();
        likeListRef.current?.reloadData();
        subscriptionListRef.current?.reloadData();
      },
    }));

    return (
      <div>
        {showComments && (
          <NotificationCommentListContent
            onDataStatus={setShowComments}
            ref={commentListRef}
          />
        )}
        {showLikes && (
          <NotificationLikeListContent
            onDataStatus={setShowLikes}
            ref={likeListRef}
          />
        )}
        {showSubscriptions && (
          <NotificationSubscriptionListContent
            onDataStatus={setShowSubscriptions}
            ref={subscriptionListRef}
          />
        )}
      </div>
    );
  }
);
export default NotificationListContent;
