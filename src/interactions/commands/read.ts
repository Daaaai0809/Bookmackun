import { READ_BOOK_MARK_COMMAND } from "@/constants";
import type { Repositories } from "@/types";
import type { SlashCommandObj } from "../handleSlashCommands";
import { buildReadCommandResponse } from "@/response/read_command_response";
import { findOrCreate } from "@/service/user_service";
import { buildErrorResponse } from "@/response/error_response";

const content = (url: string) => {
    return `
    以下のブックマークを既読にしました\n
${url}
    `;
}

const handler = async ({
	intentObj,
	repository: { userRepository, bookMarkRepository },
}: {
	intentObj: SlashCommandObj;
	repository: Repositories;
}) => {
    if (!intentObj.member) {
        throw new Error('メンバーが見つかりませんでした');
    }

    const member = intentObj.member;

    const user = await findOrCreate(member.user.id, member.user.username, userRepository);
    if (!user) {
        console.log('user not found');
        return buildErrorResponse(intentObj.member.user.id);
    }

    const bookMarkId = intentObj.data?.options.find((option) => option.name === 'id')?.value;
    if (!bookMarkId) {
        console.log('bookMarkId not found');
        return buildErrorResponse(intentObj.member.user.id);
    }

    const res = await bookMarkRepository.readBookmark(Number(bookMarkId));
    if (res) {
        return buildReadCommandResponse(content(res.url), member.user.id, []);
    }

    return buildErrorResponse(member.user.id);
};

export const readCommand = {
	commandName: READ_BOOK_MARK_COMMAND,
	handler,
};
