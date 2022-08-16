import classnames from 'classnames/bind';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import YouTube from 'react-youtube';
import style from './Trailer.module.scss';

const cl = classnames.bind(style);

const Trailer = (props) => {
    const opts = {
        playerVar: {
            autoplay: 1,
            controls: 0,
            rel: 0,
            showinfo: 0,
            volume: 0,
        },
        width: '100%',
        height: '280px',
    };
    return (
        <div className={cl('wrapper')}>
            {props.trailerUrl ? (
                <YouTube
                    name='Access-Control-Allow-Origin'
                    title={props.trailerUrl}
                    videoId={props.trailerUrl}
                    width='100%'
                    height='100%'
                    opts={opts}
                />
            ) : (
                <LazyLoadImage
                    className={cl('img')}
                    width='100%'
                    src={`https://image.tmdb.org/t/p/original/${props.src}`}
                    alt={props.src}
                />
            )}
        </div>
    );
};

export default Trailer;
