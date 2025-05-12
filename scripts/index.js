const cardTemplate = document.querySelector('#card-template').content;
const cardsList = document.querySelector('.places__list');

// Функция создания карточки
function createCard(name, link, removeFunction) {
    const card = cardTemplate.cloneNode(true);
    const cardImg = card.querySelector('.card__image');
    const cardTitle = card.querySelector('.card__title');
    const deleteButton = card.querySelector('.card__delete-button');
    cardImg.src = link;
    cardImg.alt = name;
    cardTitle.textContent = name;
    deleteButton.addEventListener('click', function(evt) {
        removeFunction(evt);
    });
    return card;
}
// Функция удаления карточки
function removeCard(evt) {
    const currentCard = evt.target.closest('.card');
    currentCard.remove();
}

initialCards.forEach(element => {
    const newCard = createCard(element.name, element.link, removeCard);
    cardsList.append(newCard);
});
