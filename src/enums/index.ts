// Request Header
export const RequestHeader = {
    ACCEPT: 'Accept',
    CONTENT_TYPE: 'Content-Type',
    AUTHORIZATION: 'Authorization',
    X_VERSION: 'X-VERSION',
    CACHE_CONTROL: 'Cache-Control',
} as const;

export type RequestHeader = typeof RequestHeader[keyof typeof RequestHeader];

// Token Types
export const TokenType = {
    SV_TOKEN: 'svToken',
    JWT_TOKEN: 'jwtToken',
    HMAC_TOKEN: 'hmacToken',
    ACCESS_TOKEN: 'accessToken'
} as const;

export type TokenType = typeof TokenType[keyof typeof TokenType];

// Request Header Values
export const AcceptType = {
    JSON: 'application/json',
} as const;

export type AcceptType = typeof AcceptType[keyof typeof AcceptType];

export const PolicyType = {
    NO_CACHE: 'no-cache',
} as const;

export type PolicyType = typeof PolicyType[keyof typeof PolicyType];

export const ContentType = {
    JSON: 'application/json',
    FORM: 'application/x-www-form-urlencoded',
} as const;

export type ContentType = typeof ContentType[keyof typeof ContentType];

export const UserAgent = {
    iPhone: 'iPhone',
    Android: 'Android',
} as const;

export type UserAgent = typeof UserAgent[keyof typeof UserAgent];

export const Environment = {
    Dev: 'Dev',
    Prod: 'Prod',
    ProdEU: 'ProdEU',
    Stack: 'Stack',
    Integration: 'Integration',
} as const;

export type Environment = typeof Environment[keyof typeof Environment];