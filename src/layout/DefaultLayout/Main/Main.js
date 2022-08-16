import { lazy, Suspense, useEffect } from 'react';
import 'react-loading-skeleton/dist/skeleton.css';
import request from '~/lib/Request';
import Banner from './Banner/Banner';

const LazyRow = lazy(() => import('~/layout/DefaultLayout/Main/Row/Row'));

const Main = () => {
    useEffect(() => {
        document.title = 'Trang chủ - Movie';
    }, []);
    return (
        <div>
            <Suspense>
                <Banner />
                <div
                    style={{
                        transform: 'translateY(-16vw)',
                        margin: '0 3vw',
                    }}
                >
                    <LazyRow
                        title='NetflixOriginals'
                        Url={request.fetchNetflixOriginals}
                    />
                    <LazyRow title='Trending' Url={request.fetchTrending} />
                    <LazyRow title='TopRated' Url={request.fetchTopRated} />
                    <LazyRow
                        title='ActionMovies'
                        Url={request.fetchActionMovies}
                    />
                    <LazyRow
                        title='ComedyMovies'
                        Url={request.fetchComedyMovies}
                    />
                    <LazyRow
                        title='RomanceMovies'
                        Url={request.fetchRomanceMovies}
                    />
                    <LazyRow
                        title='HorrorMovies'
                        Url={request.fetchHorrorMovies}
                    />
                    <LazyRow
                        title='Documantaries'
                        Url={request.fetchDocumantaries}
                    />
                </div>
            </Suspense>
        </div>
    );
};

export default Main;
