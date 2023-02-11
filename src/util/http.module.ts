import { ajax, AjaxConfig } from 'rxjs/ajax';

const apiUrl = `${process.env.API_HOST}`;

function GET<T>(config: AjaxConfig) {
  const { url, queryParams } = config;

  return ajax<T>({
    ...config,
    url: `${apiUrl}${url}`,
    queryParams,
    method: 'GET',
  });
}

function POST<T>(config: AjaxConfig) {
  const { url, queryParams, body } = config;

  return ajax<T>({
    ...config,
    url: `${apiUrl}${url}`,
    queryParams,
    body,
    method: 'POST',
  });
}

function PUT<T>(config: AjaxConfig) {
  const { url, queryParams, body } = config;

  return ajax<T>({
    ...config,
    url: `${apiUrl}${url}`,
    queryParams,
    body,
    method: 'PUT',
  });
}

function DELETE<T>(config: AjaxConfig) {
  const { url, queryParams } = config;

  return ajax<T>({
    ...config,
    url: `${apiUrl}${url}`,
    queryParams,
    method: 'DELETE',
  });
}

export const httpApi = {
  get: GET,
  post: POST,
  put: PUT,
  delete: DELETE,
};
