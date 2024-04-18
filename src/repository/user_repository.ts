import { users } from "@/drizzle/schema";
import BaseRepository from "./base_repository";
import { eq } from "drizzle-orm";

export class UserRepository extends BaseRepository {
  async findUserByDiscordUserId(discordUserId: string) {
    return await this.db.query.users.findFirst({
      where: (users, { eq }) => eq(users.discordUserId, discordUserId),
      columns: {
        id: true,
        discordUserId: true,
        name: true,
      },
    });
  }
  async findUserById(id: number) {
    return await this.db.query.users.findFirst({
      where: (users, { eq }) => eq(users.id, id),
      columns: {
        id: true,
        discordUserId: true,
        name: true,
      },
    });
  }
  async createUser(discordUserId: string, name: string) {
    return await this.db.insert(users).values({
      discordUserId,
      name,
    });
  }
  async updateUser(discordUserId: string, name: string) {
    return await this.db
      .update(users)
      .set({
        name,
      })
      .where(eq(users.discordUserId, discordUserId));
  }
}
