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
        throw new Error('メンバーが見つかりませんでした');
    }

    const member = intentObj.member;

    const user = await findOrCreate(member.user.id, member.user.username, userRepository);
    if (!user) {
        return buildErrorResponse(intentObj.member.user.id);
    }

    const bookMarkId = intentObj.data?.options.find((option) => option.name === 'id')?.value;
    if (!bookMarkId) {
        console.log('ブックマークIDが見つかりませんでした')
        return buildErrorResponse(intentObj.member.user.id);
    }

    const res = await bookMarkRepository.deleteBookmark(Number(bookMarkId))
    if (res.error) {
        return buildErrorResponse(intentObj.member.user.id);
    }

    return buildRemoveCommandResponse('ブックマークを削除しました', intentObj.member.user.id);
};

export const removeCommand = {
    commandName: REMOVE_BOOK_MARK_COMMAND,
    handler,
}
