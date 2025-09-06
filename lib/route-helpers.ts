// Route Props Helpers for Next.js 15.5
// These helpers simplify working with Promise-based params and searchParams

export async function getParams<T>(paramsPromise: Promise<T>): Promise<T> {
  return await paramsPromise;
}

export async function getSearchParams<T>(searchParamsPromise: Promise<T>): Promise<T> {
  return await searchParamsPromise;
}

// Utility type for route props
export interface RouteProps<P = {}, S = {}> {
  params: Promise<P>;
  searchParams?: Promise<S>;
}