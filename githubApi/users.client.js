import octokit from './index.client'

export const getFollowersByUserName = (name, query) =>
  octokit.request(`GET /users/${name}/followers`, query)
