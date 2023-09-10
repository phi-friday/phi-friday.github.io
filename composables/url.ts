function add_trailing_slash(path: undefined): undefined;
function add_trailing_slash(path: string): string;
function add_trailing_slash(path: string | undefined): string | undefined;
function add_trailing_slash(path: string | undefined) {
  if (!path) {
    return undefined
  }
  if (path.endsWith('/')) {
    return path;
  }
  return path + '/';
};

export { add_trailing_slash };