import Post from '../views/post.js';
import Setting from '../views/setting.js';
import NotFound from '../views/notFound.js';
import Home from '../views/home.js';

// 정규표현식으로 파라미터 나누기
const pathToRegex = (path) =>
  new RegExp('^' + path.replace(/\//g, '\\/').replace(/:\w+/g, '(.+)') + '$');

const getParams = (match) => {
  console.log(match);
  const matchValue = match.pathname.slice(1);
  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(
    (result) => result[1]
  );

  // Object.entries() : 객체 -> 배열
  // Object.fromEntries : 배열 -> 객체
  return Object.fromEntries(
    keys.map((key, i) => {
      console.log([key, matchValue[i]]);
      return [key, matchValue[i]];
    })
  );
};

const router = async () => {
  const routes = [
    { path: '/', view: Home },
    { path: '/post', view: Post },
    { path: '/post/:id', view: Post },
    { path: '/setting', view: Setting },
    { path: '/404', view: NotFound },
  ];

  const pageMatches = routes.map((route) => {
    return {
      route,
      pathname: location.pathname.match(pathToRegex(route.path)),
    };
  });

  let match = pageMatches.find((pageMatch) => pageMatch.pathname !== null);
  if (!match) {
    match = {
      route: routes[routes.length - 1],
      pathname: [location.pathname],
    };
  }

  const view = new match.route.view(getParams(match));

  document.querySelector('#app').innerHTML = await view.getHtml();
};

// https://developer.mozilla.org/en-US/docs/Web/API/Window/popstate_event
// 이것을 설정해 주지 않으면 뒤로가기 버튼 클릭시 화면이 변하지 않음
window.addEventListener('popstate', router);

// https://developer.mozilla.org/en-US/docs/Web/API/History/pushState
document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', (e) => {
    if (e.target.matches('[data-link]')) {
      e.preventDefault(); // 새로 고침 방지
      // pushState(state, unused, url)
      history.pushState(null, null, e.target.href);
      router();
    }
  });
  router();
});
