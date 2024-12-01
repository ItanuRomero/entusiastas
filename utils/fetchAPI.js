export async function fetchAPI(path) {
  const response = await fetch(path);

  const responseBody = await response.json();

  return responseBody;
}
