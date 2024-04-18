import { ADD_BOOK_MARK_COMMAND } from "@/constants";
import type { Repositories } from "@/types";
import type { SlashCommandObj } from "../handleSlashCommands";
import { buildAddCommandResponse } from "@/response/add_command_response";
import { findOrCreate } from "@/service/user_service";
import { buildErrorResponse } from "@/response/error_response";

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
  const url = intentObj.data?.options
    ?.find((option) => option.name === "add")
    ?.options?.find((option) => option.name === "url")?.value;
  if (!url) {
    return buildErrorResponse(member.user.id);
  }

  const user = await findOrCreate(
    member.user.id,
    member.user.username,
    userRepository,
  );
  if (!user) {
    return buildErrorResponse(member.user.id);
  }

  const exist = await bookMarkRepository.isExistUrl(user.id, url);
  if (exist) {
    return buildAddCommandResponse(
      user.discordUserId,
      "すでにブックマークされています",
    );
  }

  await bookMarkRepository.createBookmark(user.id, url);

  return buildAddCommandResponse(
    user.discordUserId,
    "ブックマークを追加しました",
  );
};

export const addCommand = {
  commandName: ADD_BOOK_MARK_COMMAND,
  handler,
};
