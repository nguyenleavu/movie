import { faSquareCaretDown } from '@fortawesome/free-regular-svg-icons';
import {
    faChevronLeft,
    faChevronRight,
    faCirclePlay,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames/bind';
import movieTrailer from 'movie-trailer';
import { Fragment, lazy, Suspense, useEffect, useRef, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Youtube from 'react-youtube';
import axios from '~/lib/axios';
import style from './Row.module.scss';
const Trailer = lazy(() =>
    import('~/layout/DefaultLayout/Main/Trailer/Trailer')
);

const cl = classnames.bind(style);

const Row = ({ title, Url }) => {
    const [movies, setMovies] = useState([]);
    const [slide, setSlide] = useState(0);
    const [trailerUrl, setTrailerUrl] = useState('');
    const [noTrailer, setNoTrailer] = useState(false);
    const [offTrailer, setOffTrailer] = useState(true);

    const sliderRef = useRef();
    useEffect(() => {
        const fetchData = async () => {
            await axios.get(Url).then((res) => setMovies(res.data.results));
        };
        fetchData();
    }, [Url]);

    const handleClick = (param) => {
        let distance = sliderRef.current.getBoundingClientRect().x - 40;
        if (param === 'left' && slide > 0) {
            setSlide(slide - 1);
            sliderRef.current.style.transform = `translateX(${
                200 * 6 + distance
            }px)`;
        }
        if (param === 'right' && slide < 4) {
            setSlide(slide + 1);
            sliderRef.current.style.transform = `translateX(${
                -200 * 6 + distance
            }px)`;
        }
    };

    const handleMovie = (movie) => {
        
        if (trailerUrl) {
            setTrailerUrl('');
        } else {
            //
            movieTrailer(movie?.name || movie?.original_name || movie?.title, {
                tmdbId: movie.id,
            }).then((url) => {
                if (!url) {
                    setNoTrailer(true);
                }
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get('v'));
            });

            //
        }
    };

    const opts = {
        playerVar: {
            autoPlay: 1,
        },
    };

    return (
        <Fragment>
            <h2 className={cl('title')}>{title}</h2>
            <FontAwesomeIcon
                icon={faChevronLeft}
                className={cl('btn-left')}
                onClick={() => handleClick('left')}
            />
            <FontAwesomeIcon
                icon={faChevronRight}
                className={cl('btn-right')}
                onClick={() => handleClick('right')}
            />
            <div className={cl('wrapper')} ref={sliderRef}>
                {movies.map((item, index) => (
                    <div className={cl('img-box')} key={index}>
                        <div className={cl('trailer')}>
                            <div>
                                <Suspense>
                                    <Trailer src={item.backdrop_path} />
                                </Suspense>
                            </div>
                            <div className={cl('btn-container')}>
                                <div>
                                    <div className={cl('btn-trailer')}>
                                        <FontAwesomeIcon
                                            icon={faCirclePlay}
                                            className={cl('play')}
                                            onClick={() => handleMovie(item)}
                                        />
                                    </div>
                                    <div className={cl('overview')}>
                                        <h4>
                                            Name:{' '}
                                            {item.name ||
                                                item.original_name ||
                                                item.title}
                                        </h4>
                                        <h4>Vote: {item.vote_average} </h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <LazyLoadImage
                            className={cl('img')}
                            src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`}
                            alt={item.title}
                        />
                    </div>
                ))}
            </div>
            {trailerUrl && offTrailer && (
                <div className={cl('trailer-movie')}>
                    <button onClick={() => setOffTrailer(false)}>X</button>
                    <Youtube
                        name='Access-Control-Allow-Origin'
                        title={trailerUrl}
                        videoId={trailerUrl}
                        with='100%'
                        height='100%'
                        opts={opts}
                    />
                </div>
            )}
            {noTrailer && offTrailer && (
                <div className={cl('trailer-movie')}>
                    <button onClick={() => setOffTrailer(false)}>X</button>
                    <h1>Sorry, This Movie link does not exist </h1>
                </div>
            )}
        </Fragment>
    );
};

export default Row;
