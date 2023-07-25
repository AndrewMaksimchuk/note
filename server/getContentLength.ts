export const getContentLength = (request: Request) => {
  return request
    .headers
    .get("content-length")
}
