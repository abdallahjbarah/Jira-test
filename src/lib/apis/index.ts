import wretch, { FetchLike, WretchOptions, WretchError } from 'wretch';
import QueryStringAddon from 'wretch/addons/queryString';
import authMiddleware from './authMiddleware';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

export const api = wretch()
  .url(API_URL)
  .addon(QueryStringAddon)
  .middlewares([authMiddleware]);
