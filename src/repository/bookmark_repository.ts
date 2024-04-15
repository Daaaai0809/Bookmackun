import { bookmarks } from '@/drizzle/schema';
import BaseRepository from './base_repository';
import { eq } from 'drizzle-orm';

export class BookMarkRepository extends BaseRepository {
    async findUnreadBookmarks(userId: number) {
        return await this.db.query.bookmarks.findMany({
            where: ((bookmarks, { eq, and, gt }) => and(eq(bookmarks.isRead, 0), eq(bookmarks.userId, userId), gt(bookmarks.expiredAt, new Date().toISOString()))),
            columns: {
                url: true,
                expiredAt: true,
            },
        });
    }
    async findReadBookmarks(userId: number) {
        return await this.db.query.bookmarks.findMany({
            where: ((bookmarks, { eq, and }) => and(eq(bookmarks.isRead, 1), eq(bookmarks.userId, userId))),
            columns: {
                url: true,
                expiredAt: true,
            },
        });
    }
    async createBookmark(userId: number, url: string) {
        const now = new Date();
        const expiredAt = new Date(now.setDate(now.getDate() + 3)).toISOString();

        return await this.db.insert(bookmarks).values({
            userId,
            url,
            expiredAt,
        });
    }
    async readBookmark(id: number) {
        return await this.db.update(bookmarks).set({
            isRead: 1,
        }).where(eq(bookmarks.id, id));
    }
    async deleteBookmark(id: number) {
        return await this.db.delete(bookmarks).where(eq(bookmarks.id, id));
    }
    async isExistUrl(userId: number, url: string) {
        return await this.db.query.bookmarks.findFirst({
            where: ((bookmarks, { eq, and, gt }) => and(eq(bookmarks.userId, userId), eq(bookmarks.url, url), gt(bookmarks.expiredAt, new Date().toISOString()))),
            columns: {
                id: true,
            }
        });
    }
}
