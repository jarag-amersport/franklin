export async function getConfigValue(name) {
  const { getConfigValue } = await import('../../../scripts/configs.js');
  return getConfigValue(name);
}

export async function getGQLEndpoint() {
  return getConfigValue('graphql-endpoint');
}
