export type BaseQueryHttpOptions<B = any> = {
  url: string;
  params?: any;
  body?: B;
};
