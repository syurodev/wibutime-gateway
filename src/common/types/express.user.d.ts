import { User } from '@prisma/client';

type ReqUser = User & {
  error?: { message: string };
  success?: { data: UserResponse };
};

declare global {
  namespace Express {
    interface User extends ReqUser {}
  }
}
