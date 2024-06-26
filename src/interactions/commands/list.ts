import dayjs from "dayjs";
import { LIST_BOOK_MARK_COMMAND } from "@/constants";
import type { Repositories } from "@/types";
import type { SlashCommandObj } from "../handleSlashCommands";
import { findOrCreate } from "@/service/user_service";
import { buildListCommandResponse } from "@/response/list_command_response";
import { buildErrorResponse } from "@/response/error_response";

const content = (bookmarkList: string[], today: string) => {
  const text = `
    ${today}までに登録された未読ブックマーク一覧\n
[id]　|　[url] \n
${bookmarkList.join("\n")}
    `;

  return text;
};

const handler = async ({
  intentObj,
  repository: { userRepository, bookMarkRepository },
}: {
  intentObj: SlashCommandObj;
  repository: Repositories;
}) => {
  if (!intentObj.member) {
    throw new Error("メンバーが見つかりませんでした");
  }

  const member = intentObj.member;

  const user = await findOrCreate(
    member.user.id,
    member.user.username,
    userRepository,
  );
  if (!user) {
    return buildErrorResponse(member.user.id);
  }

  const bookmarks = await bookMarkRepository.findUnreadBookmarks(user.id);
  const bookmarkList = bookmarks.map((bookmark) => {
    return `${bookmark.id}　|　${bookmark.url}`;
  });

  const today = dayjs().format("YYYY/MM/DD");

  return buildListCommandResponse(content(bookmarkList, today), member.user.id);
};

export const listCommand = {
  commandName: LIST_BOOK_MARK_COMMAND,
  handler,
};
