const myToken = 'd5859995-6c69-4052-bf8d-997a24acd60d';
const baseURL = 'https://nomoreparties.co/v1/wff-cohort-41';

const handleResponse = (res, resMessage) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`${resMessage}: ${res.status}`);
}

export const getUser = () => {
    return fetch(`${baseURL}/users/me`, {
        method: 'GET',
        headers: {
            authorization: myToken,
            'Content-Type': 'application/json'
        }
    })
        .then((res) => {
            return handleResponse(res, 'Ошибка получения данных о пользователе');
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
            return handleResponse(res, 'Ошибка получения карточек пользователей');
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
            return handleResponse(res, 'Ошибка редактирования пользователя');
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
            return handleResponse(res, 'Ошибка при создании карточки');
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
            return handleResponse(res, 'Ошибка при удалении карточки');
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
        return handleResponse(res, 'Ошибка при постановке лайка');
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
        return handleResponse(res, 'Ошибка при удалении лайка');
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
            return handleResponse(res, 'Ошибка при обновлении аватара');
        })
}
