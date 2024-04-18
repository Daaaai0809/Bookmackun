import { InteractionResponseType, APIInteractionResponseChannelMessageWithSource } from 'discord-api-types/v10';

const errorMessage = () => `
    エラーが発生しました。\n
もう一度やり直してください。
`;

type ErrorResponse = {
    type: number;
    data: {
        username: string;
        content: string;
    };
};

export const buildErrorResponse = (username: string): APIInteractionResponseChannelMessageWithSource => {
    return {
        type: InteractionResponseType.ChannelMessageWithSource,
        data: {
            username,
            content: errorMessage(),
        },
    } as ErrorResponse;
}
