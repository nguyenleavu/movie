import classnames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserAuth } from '~/context/UserAuthContext';
import style from './Login.module.scss';

const cl = classnames.bind(style);

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { logIn } = useUserAuth();
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await logIn(email, password);
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        document.title = 'Login - Movie';
    }, []);

    return (
        <div className={cl('wrapper')}>
            <section className={cl('login')}>
                <div className={cl('login_box')}>
                    <div className={cl('left')}>
                        <div className={cl('contact')}>
                            <div action=''>
                                <h3>SIGN IN</h3>
                                <input
                                    type='email'
                                    value={email}
                                    placeholder='USERNAME'
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <input
                                    type='password'
                                    value={password}
                                    placeholder='PASSWORD'
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                                {error && <p>{error}</p>}
                                <button
                                    className={cl('submit')}
                                    onClick={handleSubmit}
                                >
                                    LET'S GO
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={cl('right')}>
                        <div className={cl('right-text')}>
                            <button><Link to='/sign_up'>Sign Up</Link></button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Login;
