const defaultDomain = 'main--maidenform--hlxsites.hlx.live';
const adminBaseEndpoint = 'https://admin.hlx.page/index/hlxsites/maidenform/main';
const crypto = require('node:crypto');

async function addEntryToQueryIndex(path) {
  const api = new URL(`${adminBaseEndpoint}/${path}`);

  await fetch(api, {
    method: 'POST',
  });
}

async function removeEntryFromQueryIndex(path) {
  const api = new URL(`${adminBaseEndpoint}/${path}`);

  await fetch(api, {
    method: 'DELETE',
  });
}

async function isInSiteMap(domain, path) {
  const api = new URL(`https://${domain}/products-sitemap.xml`);
  const response = await fetch(api, {
    method: 'GET',
  });

  const result = await response.text();

  return result.includes(path);
}

async function waitForAppearanceInSiteMap(domain, path) {
  let inSiteMap = false;

  /* eslint-disable no-await-in-loop */
  while (!inSiteMap) {
    inSiteMap = await isInSiteMap(domain, path);
  }
  /* eslint-enable no-await-in-loop */
}

async function waitForRemovalFromSiteMap(domain, path) {
  let inSiteMap = true;

  /* eslint-disable no-await-in-loop */
  while (inSiteMap) {
    inSiteMap = await isInSiteMap(domain, path);
  }
  /* eslint-enable no-await-in-loop */
}

async function main() {
  const domain = process.argv[2] || defaultDomain;
  const numberOfRequests = process.argv[3] || 10;
  console.log(`Running ${numberOfRequests} requests`);

  /* eslint-disable no-await-in-loop */
  for (let i = 0; i < numberOfRequests; i += 1) {
    console.log(`Time ${new Date().toISOString()}`);
    console.log(`Using domain ${domain}`);
    const path = `/products/test/${crypto.randomUUID()}`;
    console.log(`Checking ${path}`);
    const startTime = new Date().getTime();
    await addEntryToQueryIndex(path);
    console.log(`Added ${path} to query index in ${new Date().getTime() - startTime}ms`);
    console.log(`Waiting for ${path} to appear in sitemap`);
    await waitForAppearanceInSiteMap(domain, path);
    console.log(`Appeared in sitemap in ${new Date().getTime() - startTime}ms`);
    await removeEntryFromQueryIndex(path);
    console.log(`Removed ${path} from query index in ${new Date().getTime() - startTime}ms`);
    console.log(`Waiting for ${path} to be removed from sitemap`);
    await waitForRemovalFromSiteMap(defaultDomain, path);
    console.log(`Removed from sitemap in ${new Date().getTime() - startTime}ms`);
  }
  /* eslint-enable no-await-in-loop */
}

main()
  .then()
  .catch((e) => console.error(e));
