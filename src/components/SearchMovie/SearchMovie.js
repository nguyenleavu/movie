import classnames from 'classnames/bind';
import style from './SearchMovie.module.scss';
const cl = classnames.bind(style);

const SearchMovie = (props) => {
    return (
        <div className={cl('wrapper')}>
            <img
                className={cl('image')}
                src={`https://image.tmdb.org/t/p/original/${
                    props.image1 || props.image2
                }`}
                alt={props.title}
            />
            <div className={cl('content')}>
                <h4>{props.title}</h4>
            </div>
        </div>
    );
};

export default SearchMovie;
