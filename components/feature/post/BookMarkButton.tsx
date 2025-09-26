"use client";

import updateBookmark from "@/app/action/updateBookmark";
import updateSeenUsers from "@/app/action/updateSeenUsers";
import { BookmarkIcon, BookmarkCheckIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useOptimistic, useTransition } from "react";

interface BookmarkButtonProps {
  postId: string;
  bookmarkedUsersId: string[];
  seenUsersId: string[];
  userId: string;
}

type BookMarkStatus = "NONE" | "UNSEEN" | "SEEN";

const BookmarkButton = ({
  postId,
  bookmarkedUsersId,
  userId,
  seenUsersId,
}: BookmarkButtonProps) => {
  const { resolvedTheme } = useTheme();
  const [, startTransition] = useTransition();
  const [optimisticBookmarkedUsersId, switchOptimisticBookmarkedUsersId] =
    useOptimistic(bookmarkedUsersId, currentBookmarkedUsersId => {
      if (currentBookmarkedUsersId.includes(userId)) {
        return currentBookmarkedUsersId.filter(
          bookmarkedUserId => bookmarkedUserId !== userId
        );
      } else {
        return [...currentBookmarkedUsersId, userId];
      }
    });
  const [optimisticSeenUsersId, switchOptimisticSeenUsers] = useOptimistic(
    seenUsersId,
    currentSeenUsersId => {
      if (seenUsersId.includes(userId)) {
        return seenUsersId.filter(seenUserId => seenUserId !== userId);
      } else {
        return [...currentSeenUsersId, userId];
      }
    }
  );

  const isBookMarked = optimisticBookmarkedUsersId.includes(userId);
  const isUserSeen = optimisticSeenUsersId.includes(userId);

  const bookMarkStatus: BookMarkStatus = isBookMarked
    ? isUserSeen
      ? "SEEN"
      : "UNSEEN"
    : "NONE";

  const activeColor = resolvedTheme === "dark" ? "currentColor" : "orange";

  const handleClick = () => {
    switch (bookMarkStatus) {
      case "NONE":
        // NONE → UNSEEN
        startTransition(() => {
          switchOptimisticBookmarkedUsersId(optimisticBookmarkedUsersId);
          updateBookmark(postId, "CONNECT");
        });
        break;
      case "UNSEEN":
        // UNSEEN → SEEN
        startTransition(() => {
          switchOptimisticSeenUsers(optimisticSeenUsersId);
          updateSeenUsers(postId, "CONNECT");
        });
        break;
      case "SEEN":
        // SEEN → NONE
        startTransition(() => {
          switchOptimisticBookmarkedUsersId(optimisticBookmarkedUsersId);
          updateBookmark(postId, "DISCONNECT");
        });
        startTransition(() => {
          switchOptimisticSeenUsers(optimisticSeenUsersId);
          updateSeenUsers(postId, "DISCONNECT");
        });
        break;
      default:
        return bookMarkStatus satisfies never;
    }
  };

  switch (bookMarkStatus) {
    case "SEEN":
      return (
        <BookmarkCheckIcon
          onClick={handleClick}
          stroke={activeColor}
          fill={"none"}
        />
      );
    case "UNSEEN":
      return (
        <BookmarkIcon
          onClick={handleClick}
          stroke={activeColor}
          fill={activeColor}
        />
      );
    case "NONE":
      return (
        <BookmarkIcon onClick={handleClick} stroke="currentColor" fill="none" />
      );
    default:
      return bookMarkStatus satisfies never;
  }
};

export default BookmarkButton;
