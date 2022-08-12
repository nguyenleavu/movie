import classnames from 'classnames/bind';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import style from './Trailer.module.scss';

const cl = classnames.bind(style);

const Trailer = (props) => {
    return (
        <div className={cl('wrapper')}>
            <LazyLoadImage
                className={cl('img')}
                width='100%'
                src={`https://image.tmdb.org/t/p/original/${props.src}`}
                alt={props.src}
            />
        </div>
    );
};

export default Trailer;
