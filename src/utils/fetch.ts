const usersKey = '__cofind_users__';
const users = {};
const persist = () =>
  window.localStorage.setItem(usersKey, JSON.stringify(users));
const load = () =>
  Object.assign(
    users,
    JSON.parse(window.localStorage.getItem(usersKey) as string)
  );

try {
  load();
} catch (e) {
  persist();
}

const fakeReqHandlers = [
  {
    url: '/api/register',
    method: 'POST',
    handler: async (url: any, config: any) => {
      // console.log(url, config);
      const {body} = config;
      const {username, password, passwordRepeat} = JSON.parse(body);
      const id = hash(username);
      const passwordHash = hash(password);

      // @ts-ignore
      if (users[id]) {
        throw new Error(`Username ${username} is already used.`);
      }

      if (!username) {
        throw new Error('Username cannot be empty.');
      }

      if (!password) {
        throw new Error('Password cannot be empty.');
      }

      if (!passwordRepeat) {
        throw new Error('Password is not repeated.');
      }

      if (password !== passwordRepeat) {
        throw new Error('Passwords do not match.');
      }

      const user = {id, username, passwordHash};
      // @ts-ignore
      users[id] = user;
      persist();

      return {
        status: 200,
        json: async () => ({
          ...user,
          token: btoa(id)
        })
      };
    }
  },
  {
    url: '/api/login',
    method: 'POST',
    handler: async (url: string, config: any) => {
      const {body} = config;
      const {username, password} = JSON.parse(body);
      const id = hash(username);
      // @ts-ignore
      const user = users[id] || {};

      if (user.passwordHash !== hash(password)) {
        throw new Error('Invalid username or password');
      }

      return {...user, token: btoa(id)};
    }
  }
];

function hash(str: string) {
  let hash = 5381,
    i = str.length;

  while (i) {
    hash = (hash * 33) ^ str.charCodeAt(--i);
  }
  return String(hash >>> 0);
}

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
