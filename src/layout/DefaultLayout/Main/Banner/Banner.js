import Slider from 'react-slick';
import '~/../node_modules/slick-carousel/slick/slick.css';
import '~/../node_modules/slick-carousel/slick/slick-theme.css';
import classnames from 'classnames/bind';
import style from './Banner.module.scss';
import { useEffect, useState } from 'react';
import movieTrailer from 'movie-trailer';
import Youtube from 'react-youtube';
import axios from 'axios';

const cl = classnames.bind(style);

const Banner = () => {
    const settings = {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 5000,
        autoplaySpeed: 5000,
        cssEase: 'fade',
    };

    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState('');
    const [noTrailer, setNoTrailer] = useState(false);
    const [offTrailer, setOffTrailer] = useState(true);

    useEffect(() => {
        axios
            .get(
                `https://api.themoviedb.org/3/movie/now_playing?api_key=46f227dc344ae5b612641e1575a4ccb9&language=en-US&page=1`
            )
            .then((res) => {
                setMovies(res.data.results);
            });
    }, []);
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
        <div className={cl('wrapper')}>
            <Slider {...settings}>
                {movies.map((movie, index) => (
                    <div className={cl('content')} key={index}>
                        <img
                            className={cl('image')}
                            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                            alt={movie.original_title}
                        />
                        <div className={cl('details')}>
                            <h1>{movie.title}</h1>
                            <p>{movie.overview}</p>
                            <div>
                                <button onClick={() => handleMovie(movie)}>
                                    Play
                                </button>
                                <button>MoreInfo</button>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
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
            <div className={cl('blur')}></div>
        </div>
    );
};

export default Banner;
