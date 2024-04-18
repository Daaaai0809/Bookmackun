import { BookMarkRepository } from './repository/bookmark_repository';
import { UserRepository } from './repository/user_repository';

export type Repositories = {
    userRepository: UserRepository;
    bookMarkRepository: BookMarkRepository;
};
