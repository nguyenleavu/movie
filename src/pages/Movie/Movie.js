import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classnames from 'classnames/bind';
import style from './Movie.module.scss';
import axios from 'axios';

const cl = classnames.bind(style);

const Movie = () => {
    const { id } = useParams();
    const [film, setFilm] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            await axios
                .get(
                    `https://api.themoviedb.org/3/movie/${id}?api_key=46f227dc344ae5b612641e1575a4ccb9&language=en-US`
                )
                .then((res) => setFilm(res.data));
        };
        fetchData();
    }, []);
    return (
        <div className={cl('wrapper')}>
            <div className={cl('video')}>
                <iframe
                    src={`https://www.2embed.to/embed/tmdb/movie?id=${id}`}
                    title='description'
                ></iframe>
                <div className={cl('details')}>
                    <img
                        src={`https://image.tmdb.org/t/p/original/${film.poster_path}`}
                        alt={id}
                    />
                    <div className={cl('title')}>
                        <h1>{film.original_title || film.title}</h1>
                        <p>{film.overview}</p>
                    </div>
                    <div className={cl('vote')}>
                        <p>Date : {film.release_date}</p>
                        <p>Vote : {film.vote_average}</p>
                        <p>Vote count: {film.vote_count}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Movie;
