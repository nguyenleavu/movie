import { Link, useNavigate } from 'react-router-dom';

import classnames from 'classnames/bind';
import images from '~/assets/images/index';
import { useUserAuth } from '~/context/UserAuthContext';
import style from './Header.module.scss';
import Search from './Search/Search';

const cl = classnames.bind(style);

const Header = () => {
    const { logOut } = useUserAuth();
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await logOut();
            navigate('/');
        } catch (error) {
            console.log(error.message);
        }
    };
    return (
        <div className={cl('wrapper')}>
            <div className={cl('container')}>
                <Link to='/'>
                    <img
                        className={cl('logo')}
                        src={images.logo.default}
                        alt='netflix'
                    />
                </Link>
                <Search />
                <button className={cl('btn')} onClick={handleLogout}>
                    Log out
                </button>
            </div>
        </div>
    );
};

export default Header;
