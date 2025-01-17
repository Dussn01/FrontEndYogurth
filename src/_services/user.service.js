// import config from 'config';
// import { authHeader } from '../_helpers';

export const userService = {
    login,
    logout,
    // getAll
};

function login(username, contra) {
    console.log(username, contra)
    var email = 'john@mail.com'
    var password = 'changeme'
    // console.log('XXXXXXXXXX--------XXXXXXXXXXXX')
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ email, password })
    };
    // console.log(requestOptions)
    return fetch('https://api.escuelajs.co/api/v1/auth/login', requestOptions)
        .then(handleResponse)
        .then(user => {
            console.log('user')
            console.log(user)

            // login successful if there's a jwt token in the response
            if (user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });

}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

// function getAll() {
//     const requestOptions = {
//         method: 'GET',
//         headers: authHeader()
//     };

//     return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
// }

function handleResponse(response) {
    console.log('response')


    console.log(response)
    return response.text().then(text => {
       
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}