import type { DiscordClient } from "@/client/discord";
import type { Repositories } from "@/types";
import type {
	APIBaseInteraction,
	InteractionType,
} from "discord-api-types/v10";

export type SlashCommandObj = APIBaseInteraction<
	InteractionType.ApplicationCommand,
	{
		name: string;
		options: {
			name: string;
			value: string | number;
		}[];
	}
>;

export const handleSlashCommands = async ({
	intentObj,
	repositories,
	client,
	commands,
}: {
	intentObj: SlashCommandObj;
	repositories: Repositories;
	client: DiscordClient;
	commands: {
		commandName: string;
		handler: (args: {
			intentObj: SlashCommandObj;
			repository: Repositories;
			client: DiscordClient;
		}) => Promise<{
			type: number;
			data: unknown;
		}>;
	}[];
}) => {
	for (const command of commands) {
		if (command.commandName === intentObj.data?.name) {
			return await command.handler({
				intentObj,
				repository: repositories,
				client,
			});
		}
	}
};
