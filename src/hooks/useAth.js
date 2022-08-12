/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { auth } from '~/lib/firebase';

const useAth = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    useEffect(() => {
        auth.onAuthStateChanged((auth) => {
            if (auth) {
                localStorage.setItem('user', JSON.stringify(auth));
                setUser(auth);
            } else {
                localStorage.removeItem('user');
                setUser(null);
            }
        });
    }, [auth]);

    return { user };
};

export default useAth;
