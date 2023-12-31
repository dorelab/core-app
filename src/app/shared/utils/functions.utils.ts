export const compare = (
  a: number | string,
  b: number | string,
  isAsc: boolean
) => {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
};

export const fileName = (
  fullPath: string
) => {
  return fullPath.replace(/^.*[\\/]/, '');
};
