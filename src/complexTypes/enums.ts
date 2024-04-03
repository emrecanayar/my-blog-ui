enum FileType {
  None = 0,
  Xls = 1,
  Xlsx = 2,
  Doc = 3,
  Pps = 4,
  Pdf = 5,
  Img = 6,
  Mp4 = 7,
}

enum RecordStatu {
  None = 0,
  Active = 1,
  Passive = 2,
}

enum CultureType {
  None = 0,
  Türk = 1,
  English = 2,
}

enum NotificationType {
  None = 0,
  Comment = 1,
  CommentLike = 2,
  PostLike = 3,
  Subscription = 4,
  Achievement = 5,
  Mention = 6,
  PostAnnouncement = 7,
  DailyTip = 8,
  DraftReminder = 9,
}

enum VoteType {
  None = 0,
  Upvote = 1,
  Downvote = -1,
}

enum ArticleReportType {
  None = 0,
  NotAbout = 1,
  BrokenLink = 2,
  Clickbait = 3,
  LowQuality = 4,
  NSFW = 5,
  Other = 6,
}
export {
  FileType,
  RecordStatu,
  CultureType,
  NotificationType,
  VoteType,
  ArticleReportType,
};
