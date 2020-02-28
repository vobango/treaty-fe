const fakeReqHandlers = [
  {
    url: '/api/register',
    method: 'POST',
    handler: async (url: any, config: any) => {
      console.log(url, config);
    }
  }
];

const originalFetch = window.fetch;

// @ts-ignore
window.fetch = async (url, config: any) => {
  // @ts-ignore
  let {handler} = fakeReqHandlers.find(
    handler => handler.url === url && handler.method === config.method
  );
  if (!handler) {
    handler = originalFetch;
  }
  try {
    return await handler(url, config);
  } catch (error) {
    let rejection = error;
    if (error instanceof Error) {
      rejection = {
        status: 500,
        message: error.message
      };
    }
    return Promise.reject(rejection);
  }
};

const query = async function(...args: any) {
  // @ts-ignore
  return await fetch(...args);
  // return await res.json();
};

export default query;
