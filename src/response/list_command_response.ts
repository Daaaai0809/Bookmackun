import {
	type APIInteractionResponseChannelMessageWithSource,
	InteractionResponseType,
} from "discord-api-types/v10";

type ListCommandResponse = {
	type: number;
	data: {
		username: string;
		content: string;
	};
};

export const buildListCommandResponse = (
	content: string,
	discordUserId: string,
): APIInteractionResponseChannelMessageWithSource => {
	return {
		type: InteractionResponseType.ChannelMessageWithSource,
		data: {
			username: discordUserId,
			content,
		},
	} as ListCommandResponse;
};
