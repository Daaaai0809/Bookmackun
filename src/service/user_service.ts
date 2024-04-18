import { Repositories } from '@/types';

export const findOrCreate = async (discordUserId: string, username: string, userRepository: Repositories['userRepository']) => {
    const user = await userRepository.findUserByDiscordUserId(discordUserId);
    if (user) {
        return user;
    }

    const res = await userRepository.createUser(discordUserId, username);

    const userId = res.meta.last_row_id;

    return await userRepository.findUserById(userId);
}
