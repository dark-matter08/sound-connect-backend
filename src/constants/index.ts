export enum Role {
  CONSUMER = 'CONSUMER',
  ARTIST = 'ARTIST',
  VENUE = 'VENUE',
  LABEL = 'LABEL',
}

export interface JWtPayload {
  sub: number;
  role: Role;
  name: string;
}

export interface JWTResponse {
  accessToken: string;
  refreshToken?: string;
}
