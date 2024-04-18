import dayjs from "dayjs";
import { LIST_BOOK_MARK_COMMAND } from "@/constants";
import type { Repositories } from "@/types";
import type { SlashCommandObj } from "../handleSlashCommands";
import { findOrCreate } from "@/service/user_service";
import { buildListCommandResponse } from "@/response/list_command_response";
import { buildErrorResponse } from "@/response/error_response";

const content = () => {
	const today = dayjs().format("YYYY-MM-DD");

	const text = `
        ${today}までの未読ブックマーク一覧です\n
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
		return buildErrorResponse("メンバーが見つかりませんでした");
	}

	const member = intentObj.member;

	const user = await findOrCreate(member.user.id, userRepository);
	if (!user) {
		return buildErrorResponse("ユーザーが見つかりませんでした");
	}

	const bookmarks = await bookMarkRepository.findUnreadBookmarks(user.id);
	const embeds = bookmarks.map((bookmark) => {
		return {
			url: bookmark.url,
			description: `期限: ${dayjs(bookmark.expiredAt).format("YYYY-MM-DD")}`,
		};
	});

	return buildListCommandResponse(content(), member.user.id, embeds);
};

export const listCommand = {
	commandName: LIST_BOOK_MARK_COMMAND,
	handler,
};
