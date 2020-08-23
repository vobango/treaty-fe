function request(endpoint, {body, ...customConfig} = {}) {
  const headers = {'Content-Type': 'application/json'};
  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers
    }
  };
  if (body) {
    config.body = JSON.stringify(body);
  }

  const sleep = new Promise(r => setTimeout(r, 500));
  const req = fetch(endpoint, config);
  // When showing a loader, wait at least 500ms
  // so a fast API response does not create a flickering UI
  return Promise.all([sleep, req]).then(async ([, res]) => {
    let data;
    try {
      data = await res.clone().json();
    } catch {
      data = await res.text();
    }
    if (res.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
}

export default request;
