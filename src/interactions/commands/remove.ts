import { REMOVE_BOOK_MARK_COMMAND } from '@/constants';
import { Repositories } from '@/types';
import { SlashCommandObj } from '../handleSlashCommands';
import { buildRemoveCommandResponse } from '@/response/remove_command_response';
import { findOrCreate } from '@/service/user_service';
import { buildErrorResponse } from '@/response/error_response';

const handler = async ({
    intentObj,
    repository: { userRepository, bookMarkRepository },
}: {
    intentObj: SlashCommandObj,
    repository: Repositories
}) => {
    if (!intentObj.member) {
        return buildErrorResponse('エラーが発生しました');
    }

    const member = intentObj.member;

    const user = await findOrCreate(member.user.id, userRepository);
    if (!user) {
        return buildErrorResponse('エラーが発生しました');
    }

    const bookMarkId = intentObj.data?.options.find((option) => option.name === 'id')?.value as number;
    if (!bookMarkId) {
        return buildErrorResponse('IDは必須です');
    }

    bookMarkRepository.deleteBookmark(bookMarkId)
    .then(() => {
        return buildRemoveCommandResponse(member.user.id, 'ブックマークを削除しました');
    })
    .catch(() => {
        return buildErrorResponse('ブックマークを削除できませんでした');
    });

    return buildErrorResponse('ブックマークを削除できませんでした');
};

export const removeCommand = {
    commandName: REMOVE_BOOK_MARK_COMMAND,
    handler,
}
