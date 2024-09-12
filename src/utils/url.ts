type HasPrivatePath = { _path: string };

function add_trailing_slash(path: undefined): undefined;
function add_trailing_slash(path: string): string;
function add_trailing_slash(path: string | undefined): string | undefined;
function add_trailing_slash(path: string | undefined) {
  if (!path) {
    return undefined;
  }
  if (path.endsWith("/")) {
    return path;
  }
  return path + "/";
}

const _has_path = (path: any): path is HasPrivatePath => {
  return (
    path &&
    typeof path === "object" &&
    "_path" in path &&
    typeof path._path === "string"
  );
};
const _resolve_path = (
  path:
    | string
    | HasPrivatePath
    | Ref<string>
    | Ref<HasPrivatePath>
    | Ref<string | HasPrivatePath>
): string | HasPrivatePath => {
  if (typeof path === "string" || _has_path(path)) {
    return path;
  }
  return _resolve_path(path.value);
};
const create_url_with_prefix = (
  prefix: string,
  path: string | HasPrivatePath | Ref<string> | Ref<HasPrivatePath>
): string => {
  path = _resolve_path(path);
  if (_has_path(path)) {
    path = path._path;
  }
  if (!path.startsWith("/")) {
    prefix = prefix + "/";
  }
  return add_trailing_slash(prefix + path);
};

const validate_url = (prefix: string, path: string): void => {
  if (path === prefix || path === prefix + "/") {
    throw createError({ statusCode: 404, statusMessage: "Post not found" });
  }
};

const parse_path = (path: string): string => {
  path = "/" + path.split("/").slice(2).join("/");
  if (path.endsWith("/")) {
    path = path.slice(0, -1);
  }
  return path;
};

export { add_trailing_slash, create_url_with_prefix, parse_path, validate_url };
