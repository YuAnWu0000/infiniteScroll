import octokit from './index.client'

// eslint-disable-next-line import/prefer-default-export
export const getFollowersByUserName = (name, query) =>
  octokit.request(`GET /users/${name}/followers`, query)
