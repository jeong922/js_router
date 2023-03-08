import Post from '../views/post.js';
import Setting from '../views/setting.js';
import NotFound from '../views/notFound.js';
import Home from '../views/home.js';

const router = async () => {
  const routes = [
    { path: '/', view: Home },
    { path: '/post', view: Post },
    { path: '/setting', view: Setting },
    { path: '/404', view: NotFound },
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

  const view = new match.route.view();

  document.querySelector('#app').innerHTML = await view.getHtml();
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
