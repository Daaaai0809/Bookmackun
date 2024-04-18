import {
	InteractionResponseType,
	type APIInteractionResponseChannelMessageWithSource,
} from "discord-api-types/v10";

type ReadCommandResponse = {
	type: number;
	data: {
		username: string;
		content: string;
		embeds: {
			title: string;
			url: string;
		}[];
	};
};

export const buildReadCommandResponse = (
	content: string,
	discordUserId: string,
	embeds: { title: string; url: string }[],
): APIInteractionResponseChannelMessageWithSource => {
	return {
		type: InteractionResponseType.ChannelMessageWithSource,
		data: {
			username: discordUserId,
			content,
			embeds,
		},
	} as ReadCommandResponse;
};
