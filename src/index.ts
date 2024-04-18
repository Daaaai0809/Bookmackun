import { Hono } from "hono";
import { createMiddleware } from "hono/factory";
import { drizzle } from "drizzle-orm/d1";
import { verifyKey, InteractionResponseType } from "discord-interactions";
import { DiscordClient } from "./client/discord";
import * as schema from "./drizzle/schema";
import { UserRepository } from "./repository/user_repository";
import { BookMarkRepository } from "./repository/bookmark_repository";
import { handleSlashCommands } from "./interactions/handleSlashCommands";
import { addCommand } from "./interactions/commands/add";
import { helpCommand } from "./interactions/commands/help";
import { listCommand } from "./interactions/commands/list";
import { readCommand } from "./interactions/commands/read";
import { removeCommand } from "./interactions/commands/remove";

export type Bindings = {
	DISCORD_PUBLIC_KEY: string;
	DISCORD_APP_ID: string;
	DISCORD_BOT_TOKEN: string;
	DISCORD_PERMISSION_ID: string;
	D1_DATABASE: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

export const verifyMiddleware = createMiddleware<{ Bindings: Bindings }>(
	async (c, next) => {
		const signature = c.req.header("x-signature-ed25519");
		const timestamp = c.req.header("x-signature-timestamp");
		const rawBody = await c.req.raw.clone().text();

		const isValid =
			signature &&
			timestamp &&
			verifyKey(rawBody, signature, timestamp, c.env.DISCORD_PUBLIC_KEY);
		if (!isValid) {
			return c.text("Invalid request signature", 401);
		}

		const body = JSON.parse(rawBody);
		if (body.type === InteractionResponseType.PONG) {
			return c.json({ type: InteractionResponseType.PONG });
		}

		return await next();
	},
);

app.post("/", verifyMiddleware, async (c) => {
	const body = await c.req.json();

	const db = drizzle(c.env.D1_DATABASE, { schema: schema });

	const repositories = {
		userRepository: new UserRepository(db),
		bookMarkRepository: new BookMarkRepository(db),
	};

	const client = new DiscordClient(c.env.DISCORD_BOT_TOKEN);

	try {
		return c.json(
			await handleSlashCommands({
				intentObj: body,
				repositories,
				client,
				commands: [
					addCommand,
					listCommand,
					readCommand,
					removeCommand,
					helpCommand,
				],
			}),
		);
	} catch (e) {
		console.error(e);

		return c.json({
			type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
			data: {
				content: "エラーが発生しました",
			},
		});
	}
});

export default app;
