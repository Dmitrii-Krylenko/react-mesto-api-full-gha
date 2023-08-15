export const BASE_URL = 'https://api.korolek.nomoreparties.nomoreparties.co';

export const register = (password, email) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "password": password,
            "email": email
        }),
        credentials: 'include'
    })
        .then((response) => {

            if (response.ok) {
                return response.json();
            }
            throw response

        })
    // .then((res) => {
    //     return res;
    //     // {"data":{"_id":"649338df36ce0c001a41c498","email":"ww1w@ww.ru"}}
    // })
    // .catch((err) => {
    //     console.log('catch')
    //     console.log(err)
    // });
};

export const login = (password, email) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "password": password,
            "email": email
        }),
        credentials: 'include'
    })
        .then((response) => {

            if (response.ok) {
                return response.json();
            }
            throw response
        })

        // .then((data) => {
        //     // сохраняем токен
        //     if (data.token) {
        //         localStorage.setItem('token', data.token);
        //     }
        //     return data
        // })
        .catch((err) => console.log(err));
};

export const getToken = () => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
        .then((response) => {

            if (response.ok) {
                return response.json();

            }
            throw response

        })
    // .catch((err) => console.log(err));
}; 