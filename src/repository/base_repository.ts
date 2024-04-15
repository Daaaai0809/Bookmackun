import { DrizzleD1Database } from 'drizzle-orm/d1';
import * as schema from '@/drizzle/schema';

export default class BaseRepository {
    public db: DrizzleD1Database<typeof schema>;

    constructor(db: DrizzleD1Database<typeof schema>) {
        this.db = db;
    }
};
