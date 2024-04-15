import { Hono } from 'hono'
import { createMiddleware } from 'hono/factory';
import { verifyKey, InteractionResponseType } from 'discord-interactions';
import { COMMANDS } from './constants';
import { DiscordClient } from './client/discord';

export type Bindings = {
  DISCORD_PUBLIC_KEY: string,
  DISCORD_APP_ID: string,
  DISCORD_BOT_TOKEN: string,
  DISCORD_PERMISSION_ID: string,
  D1_DATABASE: D1Database,
}

const app = new Hono<{ Bindings: Bindings }>()

export const verifyMiddleware = createMiddleware<{ Bindings: Bindings }>(async (c, next) => {
    const signature = c.req.header('x-signature-ed25519')
    const timestamp = c.req.header('x-signature-timestamp')
    const rawBody = await c.req.raw.clone().text();

    const isValid = signature && timestamp && verifyKey(rawBody, signature, timestamp, c.env.DISCORD_PUBLIC_KEY);
    if (!isValid) {
      return c.text('Invalid request signature', 401)
    }

    const body = JSON.parse(rawBody);
  if (body.type === InteractionResponseType.PONG) {
    return c.json({ type: InteractionResponseType.PONG });
  }

    return await next();
  }
);

app.post('/', verifyMiddleware, async (c) => {
  const body = await c.req.json();

  const client = new DiscordClient(c.env.DISCORD_BOT_TOKEN);

  return c.json({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: `Hello, World!`
    }
  });
})

export default app
