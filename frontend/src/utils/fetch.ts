type Others = {
  body?: BodyInit | null | undefined | any;
  method?: 'GET' | 'POST';
};

const apiClient = async (endpoint: string, o?: Others) => {
  const BE_BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

  if (!window.localStorage.getItem('auth_token')) {
    return 'Auth token is not present in the call';
  }

  if (o && !o.method) {
    o.method = 'GET';
  }

  const headers = {
    Accept: 'application/json',
    Authorization: 'Bearer ' + window.localStorage.getItem('auth_token'),
    'Content-Type': 'application/json',
  };

  if (o && o.body) {
    o.body = JSON.stringify(o.body);
  }

  const response: Response = await fetch(`${BE_BASE_URL}/${endpoint}`, {
    method: o?.method,
    headers: headers,
    body: o?.body,
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message);
  } else {
    const responseData = await response.json();

    return responseData;
  }
};

export const secureFetch = (endpoint: string, o: Others = {}) => {
  return apiClient(endpoint, o);
};
