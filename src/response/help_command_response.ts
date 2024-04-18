import { APIInteractionResponseChannelMessageWithSource, InteractionResponseType } from 'discord-api-types/v10';

type HelpCommandResponse = {
    type: number;
    data: {
        content: string;
    };
};

export const buildHelpCommandResponse = (content: string): APIInteractionResponseChannelMessageWithSource => {
    return {
        type: InteractionResponseType.ChannelMessageWithSource,
        data: {
            content,
        },
    } as HelpCommandResponse;
}
