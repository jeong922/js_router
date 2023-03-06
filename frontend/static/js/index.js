const router = async () => {
  const routes = [
    { path: '/', view: () => console.log('home') },
    { path: '/post', view: () => console.log('post') },
    { path: '/setting', view: () => console.log('setting') },
    { path: '/404', view: () => console.log('NotFound') },
  ];

  const pageMatches = routes.map((route) => {
    return {
      route,
      isMatch: route.path === location.pathname,
    };
  });
  let match = pageMatches.find((pageMatch) => pageMatch.isMatch);
  if (!match) {
    match = {
      route: routes[routes.length - 1],
      isMatch: true,
    };
  }
  console.log(match.route.view());
};

document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', (e) => {
    if (e.target.matches('[data-link]')) {
      e.preventDefault();
      history.pushState(null, null, e.target.href); // pushState(state, unused, url)
      router();
    }
  });
  router();
});
