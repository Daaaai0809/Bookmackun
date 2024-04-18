import { InteractionResponseType, APIInteractionResponseChannelMessageWithSource } from 'discord-api-types/v10';

type RemoveCommandResponse = {
    type: number;
    data: {
        username: string;
        content: string;
    };
};

export const buildRemoveCommandResponse = (username: string, content: string): APIInteractionResponseChannelMessageWithSource => {
    return {
        type: InteractionResponseType.ChannelMessageWithSource,
        data: {
            username,
            content,
        },
    } as RemoveCommandResponse;
}