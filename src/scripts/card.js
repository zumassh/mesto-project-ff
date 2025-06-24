import { deleteCard, deleteLike, putLike } from "./api";

// Функция создания карточки
export const createCard = (cardTemplate, name, link, removeFunction, likeFunction, openFunction, ownerId, userId, cardId, likes) => {
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImg = card.querySelector('.card__image');
    const cardTitle = card.querySelector('.card__title');
    const deleteButton = card.querySelector('.card__delete-button');
    const cardPictureButton = card.querySelector('.card__image');
    const likeIcon = card.querySelector('.card__like-button');
    const likeCounter = card.querySelector('.like__counter');

    cardImg.src = link;
    cardImg.alt = name;
    cardTitle.textContent = name;
    likeCounter.textContent = likes.length;

    if (likes.some(user => user._id === userId)) {
        likeIcon.classList.add('card__like-button_is-active');
    }

    if (ownerId !== userId) {
        deleteButton.remove();
    } else {
        deleteButton.addEventListener('click', function (evt) {
            removeFunction(evt, cardId);
        });
    }

    likeIcon.addEventListener('click', () => likeFunction(likeIcon, cardId, likeCounter, userId));

    cardPictureButton.addEventListener('click', () => openFunction(link, name));
    return card;
}

// Функция удаления карточки
export const removeCard = (evt, cardId) => {
    const currentCard = evt.target.closest('.card');
    deleteCard(cardId)
        .then(() => {
            currentCard.remove();
        })
        .catch(err => {
            console.error('Ошибка при удалении карточки:', err);
        });
}

// обработка лайка
export const likeCard = (button, cardId, likeCounter) => {
    const isLiked = button.classList.contains('card__like-button_is-active');

    if (isLiked) {
        deleteLike(cardId)
            .then((updatedCard) => {
                button.classList.remove('card__like-button_is-active');
                likeCounter.textContent = updatedCard.likes.length;
            })
            .catch((err) => {
                console.error('Ошибка при удалении лайка:', err);
            });
    } else {
        putLike(cardId)
            .then((updatedCard) => {
                button.classList.add('card__like-button_is-active');
                likeCounter.textContent = updatedCard.likes.length;
            })
            .catch((err) => {
                console.error('Ошибка при постановке лайка:', err);
            });
    }
};
