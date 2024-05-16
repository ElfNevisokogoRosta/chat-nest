export interface JwtPayload {
  id?: number;
  email?: string;
  username?: string;
  exp?: number;
  iat?: number;
}
