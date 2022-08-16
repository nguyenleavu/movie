import Home from '~/pages/Home/Home';
import Movie from '~/pages/Movie/Movie';

const RoutePages = [
    { path: '/', component: Home },
    { path: '/movie/:id', component: Movie },
];

export { RoutePages };
