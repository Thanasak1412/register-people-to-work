function path(root, subLink) {
  return `${root}${subLink}`;
}

const ROOTS_AUTH = '/auth';
export const PATH_ROOT = '/';

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
};

export const PATH_DASHBOARD = {
  root: PATH_ROOT,
};
