export const assetPath = (path) => {
  if (!path) return null;
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
};
