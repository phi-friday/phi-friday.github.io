export default defineNuxtRouteMiddleware((to) => {
  if (to.path === '/' || !to.path.endsWith('/')) {
    return;
  }

  const path = to.path.replace(/\/+$/, '') || '/';

  return navigateTo(
    { path, hash: to.hash, query: to.query, params: to.params },
    { redirectCode: 308 }
  );
});
