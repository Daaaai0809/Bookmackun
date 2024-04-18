import type { RESTPostAPIChannelMessageJSONBody } from "discord-api-types/v10";

export class DiscordClient {
	private BASE_URL = "https://discord.com/api/v10";
	private config: { headers: Record<string, string> };

	constructor(token: string) {
		this.config = {
			headers: {
				Authorization: `Bot ${token}`,
				"Content-Type": "application/json",
			},
		};
	}

	async sendMessage(
		channelId: string,
		body: RESTPostAPIChannelMessageJSONBody,
	): Promise<void> {
		const res = await fetch(`${this.BASE_URL}/channels/${channelId}/messages`, {
			method: "POST",
			headers: this.config.headers,
			body: JSON.stringify(body),
		});
		if (!res.ok) {
			throw new Error(`Failed to send message: ${res.statusText}`);
		}
	}
}
