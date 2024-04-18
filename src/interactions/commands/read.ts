import { READ_BOOK_MARK_COMMAND } from "@/constants";
import type { Repositories } from "@/types";
import type { SlashCommandObj } from "../handleSlashCommands";
import { buildReadCommandResponse } from "@/response/read_command_response";
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
		return buildErrorResponse("エラーが発生しました");
	}

	const member = intentObj.member;

	const user = await findOrCreate(member.user.id, userRepository);
	if (!user) {
		return buildErrorResponse("エラーが発生しました");
	}

	const bookMarkId = intentObj.data?.options.find(
		(option) => option.name === "id",
	)?.value as number;
	if (!bookMarkId) {
		return buildErrorResponse("IDは必須です");
	}

	bookMarkRepository
		.readBookmark(bookMarkId)
		.then((res) => {
			if (res) {
				return buildReadCommandResponse(
					"ブックマークを既読にしました",
					member.user.id,
					[
						{
							title: "", // TODO: add したときにタイトルを取得しここで返せるようにする
							url: res.url,
						},
					],
				);
			}

			return buildErrorResponse("ブックマークが見つかりませんでした");
		})
		.catch(() => {
			return buildErrorResponse("ブックマークを既読にできませんでした");
		});

	return buildErrorResponse("ブックマークを既読にできませんでした");
};

export const readCommand = {
	commandName: READ_BOOK_MARK_COMMAND,
	handler,
};
