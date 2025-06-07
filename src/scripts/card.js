// Функция создания карточки
export function createCard(cardTemplate, name, link, removeFunction, likeFunction) {
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImg = card.querySelector('.card__image');
    const cardTitle = card.querySelector('.card__title');
    const deleteButton = card.querySelector('.card__delete-button');
    cardImg.src = link;
    cardImg.alt = name;
    cardTitle.textContent = name;
    deleteButton.addEventListener('click', function (evt) {
        removeFunction(evt);
    });
    return card;
}

// Функция удаления карточки
export function removeCard(evt) {
    const currentCard = evt.target.closest('.card');
    currentCard.remove();
}

// обработка лайка
export function likeCard(button) {
    button.classList.toggle('card__like-button_is-active');
}