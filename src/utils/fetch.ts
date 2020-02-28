import fetch from 'isomorphic-unfetch';

export default async function(...args: any) {
  // @ts-ignore
  const res = await fetch(...args);
  return await res.json();
}
