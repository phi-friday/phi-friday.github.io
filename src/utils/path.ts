export const get_dirname = (path: string): string => {
  const parts = path.split("/");
  parts.pop();
  return parts.join("/");
};

export const join_path = (path: string, ...paths: string[]): string => {
  const parts = path.split("/");

  for (const sub_path of paths) {
    const sub_parts = sub_path.split("/");
    for (const sub_part of sub_parts) {
      if (sub_part === "..") {
        parts.pop();
        continue;
      }
      if (sub_part === ".") {
        continue;
      }
      parts.push(sub_part);
    }
  }
  return parts.join("/");
};

export const remove_public_path = (path: string): string => {
  return path.replace(/^(\/?(src\/)?(public|assets)\/)/, "/");
};
