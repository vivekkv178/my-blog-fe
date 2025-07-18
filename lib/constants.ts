export const FE_ROUTES = {
  ROOT: "/",
  LOGIN: "/login",
  HOME: "/home",
  POST: "/post",
};

export const BE_ROUTES = {

};

export enum ROLES {
  ADMIN = "ADMIN",
  ORG_USER = "ORG_USER",
  USER = "USER",
}

export const RBAC = {
  [ROLES.USER]: [ROLES.USER, ROLES.ORG_USER, ROLES.ADMIN],
  [ROLES.ORG_USER]: [ROLES.ORG_USER, ROLES.ADMIN],
  [ROLES.ADMIN]: [ROLES.ADMIN],
};

export type Route = {
  icon: string;
  path: string;
  title: string;
  role: ROLES;
  customClick?: boolean;
  badge?: number;
};

export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
  OPTIONS = "OPTIONS",
  HEAD = "HEAD",
}

export const FIREBASE_CONSTANTS = {
  BLOGS_COLLECTION_NAME: "blogs",
};
