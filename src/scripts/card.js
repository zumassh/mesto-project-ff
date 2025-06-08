// Функция создания карточки
export const createCard = (cardTemplate, name, link, removeFunction, likeFunction, openFunction) => {
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImg = card.querySelector('.card__image');
    const cardTitle = card.querySelector('.card__title');
    const deleteButton = card.querySelector('.card__delete-button');
    const cardPictureButton = card.querySelector('.card__image');
    const likeIcon = card.querySelector('.card__like-button');
    cardImg.src = link;
    cardImg.alt = name;
    cardTitle.textContent = name;

    deleteButton.addEventListener('click', function (evt) {
        removeFunction(evt);
    });

    likeIcon.addEventListener('click', () => likeFunction(likeIcon));

    cardPictureButton.addEventListener('click', () => openFunction(link, name));
    return card;
}

// Функция удаления карточки
export const removeCard = (evt) => {
    const currentCard = evt.target.closest('.card');
    currentCard.remove();
}

// обработка лайка
export const likeCard = (button) => {
    button.classList.toggle('card__like-button_is-active');
}