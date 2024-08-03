import { UserRole } from 'src/users/entities/user.entity';

export interface UserInJWTPayload {
  id: string;
  role: UserRole;
  cartId: string;
  favoriteId: string;
  iat: number;
  exp: number;
}
