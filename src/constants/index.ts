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

// music-genre.enum.ts

export enum MusicGenre {
  POP = 'Pop',
  ROCK = 'Rock',
  HIP_HOP = 'Hip Hop',
  COUNTRY = 'Country',
  EDM = 'Electronic Dance Music',
  R_AND_B = 'R&B',
  JAZZ = 'Jazz',
  CLASSICAL = 'Classical',
  REGGAE = 'Reggae',
  BLUES = 'Blues',
  METAL = 'Metal',
  ALTERNATIVE = 'Alternative',
  INDIE = 'Indie',
  LATIN = 'Latin',
  FUNK = 'Funk',
  SOUL = 'Soul',
  PUNK = 'Punk',
  DISCO = 'Disco',
  GOSPEL = 'Gospel',
  K_POP = 'K-Pop',
  J_POP = 'J-Pop',
}

export enum ContentType {
  PAID = 'PAID',
  FREE = 'FREE',
}
