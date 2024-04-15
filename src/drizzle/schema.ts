import { relations, sql } from 'drizzle-orm';
import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    discordUserId: text('discord_user_id').notNull().unique(),
    name: text('name').notNull(),
    createdAt: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const userRelations = relations(users, ({ many }) => ({
    bookmarks: many(bookmarks),
}));

export const bookmarks = sqliteTable('bookmarks', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    url: text('url').notNull(),
    isRead: integer('is_read').notNull().default(0),
    expiredAt: text('expired_at').notNull(),
    createdAt: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
});
