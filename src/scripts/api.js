// const config = {
//   baseUrl: 'https://nomoreparties.co/v1/wff-cohort-41',
//   headers: {
//     authorization: 'd5859995-6c69-4052-bf8d-997a24acd60d',
//     'Content-Type': 'application/json'
//   }
// }

const myToken = 'd5859995-6c69-4052-bf8d-997a24acd60d';
const baseURL = 'https://nomoreparties.co/v1/wff-cohort-41';

export const getUser = () => {
    return fetch(`${baseURL}/users/me`, {
        method: 'GET',
        headers: {
            authorization: myToken,
            'Content-Type': 'application/json'
        }
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка получения данных о пользователе: ${res.status}`);
        });
}

export const getCards = () => {
    return fetch(`${baseURL}/cards`, {
        method: 'GET',
        headers: {
            authorization: myToken,
            'Content-Type': 'application/json'
        }
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка получения карточек пользователей: ${res.status}`);
        });
}

export const setUser = (username, desc) => {
    return fetch(`${baseURL}/users/me`, {
        method: 'PATCH',
        headers: {
            authorization: myToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: username,
            about: desc
        })
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка редактирования пользователя: ${res.status}`);
        })
}

export const addCard = (cardName, cardLink) => {
    return fetch(`${baseURL}/cards`, {
        method: 'POST',
        headers: {
            authorization: myToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: cardName,
            link: cardLink
        })
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка при создании карточки: ${res.status}`);
        });
}

export const deleteCard = (cardId) => {
    return fetch(`${baseURL}/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: myToken,
        }
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка при удалении карточки: ${res.status}`);
        });
}

export const putLike = (cardId) => {
    return fetch(`${baseURL}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: {
            authorization: myToken,
            'Content-Type': 'application/json'
        }
    }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка при постановке лайка: ${res.status}`);
        });
};

export const deleteLike = (cardId) => {
    return fetch(`${baseURL}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: myToken,
            'Content-Type': 'application/json'
        }
    }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка при удалении лайка: ${res.status}`);
        });
};

export const changeAvatar = (avatarLink) => {
    return fetch(`${baseURL}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
            authorization: myToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            avatar: avatarLink
        })
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка при обновлении аватара: ${res.status}`);
    })
}
