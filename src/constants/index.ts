export enum Role {
  CONSUMER = 'CONSUMER',
  ARTIST = 'ARTIST',
  VENUE = 'VENUE',
  LABEL = 'LABEL',
}

export interface JWtPayload {
  id: number;
  role: Role;
}
