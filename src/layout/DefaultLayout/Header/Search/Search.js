import { faXmarkCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames/bind';
import style from './Search.module.scss';
import Tippy from '@tippyjs/react/headless';
import { useEffect, useRef, useState } from 'react';
import SearchMovie from '~/components/SearchMovie/SearchMovie';
import axios from 'axios';
import useDebounce from '~/hooks/useDebounce';

const cl = classnames.bind(style);

const Search = () => {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);

    const debounced = useDebounce(searchValue, 500);

    const inputRef = useRef();

    const handleHideResult = () => {
        setShowResult(false);
    };

    useEffect(() => {
        if (!debounced.trim()) {
            return;
        }
        setLoading(true);
        axios
            .get(
                `https://api.themoviedb.org/3/search/movie?api_key=46f227dc344ae5b612641e1575a4ccb9&language=en-US&page=1&`,
                {
                    params: {
                        query: debounced,
                    },
                }
            )
            .then((res) => {
                setSearchResult(res.data.results);
                setLoading(false);
            });
    }, [debounced]);
    return (
        <div className={cl('wrapper')}>
            <Tippy
                interactive
                visible={showResult && searchResult.length > 0}
                render={(attrs) => (
                    <div className={cl('box')} tabIndex='-1' {...attrs}>
                        {searchResult.map((item, index) => (
                            <SearchMovie
                                key={index}
                                image1={item.backdrop_path}
                                image2={item.poster_path}
                                title={item.original_title}
                            />
                        ))}
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <div className={cl('container')}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        placeholder='Search'
                        onChange={(e) => setSearchValue(e.target.value)}
                        onFocus={() => setShowResult(true)}
                    />
                    {searchValue && !loading && (
                        <button
                            className={cl('clear')}
                            onClick={() => {
                                setSearchValue('');
                                inputRef.current.focus();
                            }}
                        >
                            <FontAwesomeIcon icon={faXmarkCircle} />
                        </button>
                    )}
                    {loading && (
                        <span className={cl('loading')}>
                            <FontAwesomeIcon icon={faSpinner} />
                        </span>
                    )}
                </div>
            </Tippy>
        </div>
    );
};

export default Search;
