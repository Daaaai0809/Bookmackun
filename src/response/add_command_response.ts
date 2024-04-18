import { APIInteractionResponseChannelMessageWithSource, InteractionResponseType } from 'discord-api-types/v10';

type AddCommandResponse = {
    type: number;
    data: {
        username: string;
        content: string;
    };
};

export const buildAddCommandResponse = (username: string, content: string): APIInteractionResponseChannelMessageWithSource => {
    return {
        type: InteractionResponseType.ChannelMessageWithSource,
        data: {
            username,
            content,
        },
    } as AddCommandResponse;
}
