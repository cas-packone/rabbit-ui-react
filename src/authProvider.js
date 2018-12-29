import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR } from 'react-admin';

export default (type, params) => {
    if (type === AUTH_LOGIN) {
        const { username, password } = params;
        const request = new Request('http://localhost:8080/api/token/', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        })
        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(({ access, refresh }) => {
                localStorage.setItem('token', access);
                localStorage.setItem('refresh-token', refresh);
            });
    }
    if (type === AUTH_LOGOUT) {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh-token');
        return Promise.resolve();
    }
    if (type === AUTH_ERROR) {
        const status  = params.status;
        if (status === 401 || status === 403) {
            return fetch('http://localhost:8080/api/token/refresh/', {
                method: 'POST',
                body: JSON.stringify({refresh: localStorage.getItem('refresh-token')}),
                headers: new Headers({ 'Content-Type': 'application/json' }),
            }).then(response => {
                if (response.status < 200 || response.status >= 300) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('refresh-token');
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(({ access }) => {
                localStorage.setItem('token', access);
            });
        }
        return Promise.resolve();
    }
    return Promise.resolve();
}