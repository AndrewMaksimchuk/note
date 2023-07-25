export const getSearchParam = (request: Request, param: string) => {
  return (new URL(request.url)).searchParams.get(param);
}
