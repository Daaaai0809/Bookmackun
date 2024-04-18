import type { BookMarkRepository } from "./repository/bookmark_repository";
import type { UserRepository } from "./repository/user_repository";

export type Repositories = {
  userRepository: UserRepository;
  bookMarkRepository: BookMarkRepository;
};
