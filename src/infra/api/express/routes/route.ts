import { Request, Response } from "express";

export type HttpMethod = 'get' | 'post' | 'patch' | 'put' | 'delete';
export const HttpMethod = {
    GET: 'get' as HttpMethod,
    POST: 'post' as HttpMethod,
    PATCH: 'patch' as HttpMethod,
    PUT: 'put' as HttpMethod,
    DELETE: 'delete' as HttpMethod
} as const;

export interface IRoute {
    getHandler(): (req: Request, res: Response) => Promise<void | Response>,
    getPath: () => string,
    getMethod: () => HttpMethod
}