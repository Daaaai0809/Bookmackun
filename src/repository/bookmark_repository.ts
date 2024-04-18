import { bookmarks } from '@/drizzle/schema';
import BaseRepository from './base_repository';
import { eq } from 'drizzle-orm';
import dayjs from 'dayjs';

export class BookMarkRepository extends BaseRepository {
    /**
     * 未読のブックマークを取得
     */
    async findUnreadBookmarks(userId: number) {
        return await this.db.query.bookmarks.findMany({
            where: ((bookmarks, { eq, and, gt }) => and(eq(bookmarks.isRead, 0), eq(bookmarks.userId, userId), gt(bookmarks.expiredAt, new Date().toISOString()))),
            columns: {
                url: true,
                expiredAt: true,
            },
        });
    }

    /**
     *  既読のブックマークを取得
     */
    async findReadBookmarks(userId: number) {
        return await this.db.query.bookmarks.findMany({
            where: ((bookmarks, { eq, and }) => and(eq(bookmarks.isRead, 1), eq(bookmarks.userId, userId))),
            columns: {
                url: true,
                expiredAt: true,
            },
        });
    }

    /** 
     * ブックマークの登録
     */
    async createBookmark(userId: number, url: string) {
        const expiredAt = dayjs().add(5, 'day').toISOString();

        return await this.db.insert(bookmarks).values({
            userId,
            url,
            expiredAt,
        });
    }

    /**
     * ブックマークの既読
     */
    async readBookmark(id: number) {
        this.db.update(bookmarks).set({
            isRead: 1,
        }).where(eq(bookmarks.id, id))
        .catch(() => {
            throw new Error('ブックマークを既読にできませんでした');
        });

        return this.db.query.bookmarks.findFirst({
            where: ((bookmarks, { eq }) => eq(bookmarks.id, id)),
            columns: {
                url: true,
                expiredAt: true,
            }
        });
    }
    
    /**
     * ブックマークの削除
     */
    async deleteBookmark(id: number) {
        return await this.db.delete(bookmarks).where(eq(bookmarks.id, id));
    }

    /** 
     * 既に同様のURLが登録されているか確認
     */
    async isExistUrl(userId: number, url: string) {
        return await this.db.query.bookmarks.findFirst({
            where: ((bookmarks, { eq, and, gt }) => and(eq(bookmarks.userId, userId), eq(bookmarks.url, url), gt(bookmarks.expiredAt, new Date().toISOString()))),
            columns: {
                id: true,
            }
        });
    }
}
