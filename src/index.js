import './pages/index.css';
import { closeModal, openModal } from './scripts/modal';
import { createCard, likeCard, removeCard } from './scripts/card';
import { initialCards } from './scripts/cards';

const cardTemplate = document.querySelector('#card-template').content;
const cardsList = document.querySelector('.places__list');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const cardPicturePopup = document.querySelector('.popup_type_image');
const editPopup = document.querySelector('.popup_type_edit');
const addPopup = document.querySelector('.popup_type_new-card');

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

const editProfileForm = document.forms['edit-profile'];

const newCardForm = document.forms['new-place'];
const placeNameInput = newCardForm.querySelector('.popup__input_type_card-name');
const placeLinkInput = newCardForm.querySelector('.popup__input_type_url');

const handleFormSubmit = (evt) => {
    evt.preventDefault();

    let name = nameInput.value;
    let job = jobInput.value;

    profileName.textContent = name;
    profileDescription.textContent = job;

    closeModal(editPopup);
}

const openCard = (link, name) => {
    const popupImage = cardPicturePopup.querySelector('.popup__image');
    const popupCaption = cardPicturePopup.querySelector('.popup__caption');
    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;
    openModal(cardPicturePopup);
}

function renderCard(name, link) {
    const cardElement = createCard(cardTemplate, name, link, removeCard, likeCard, openCard);
    return cardElement;
}

editButton.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
    openModal(editPopup);
});
addButton.addEventListener('click', () => openModal(addPopup));

document.querySelectorAll('.popup').forEach((popup) => {
    popup.classList.add('popup_is-animated');
    popup.addEventListener('click', (event) => {
        if (event.target === popup) {
            closeModal(popup);
        }
    });
    const closeBtn = popup.querySelector('.popup__close');
    closeBtn.addEventListener('click', () => closeModal(popup));
});

editProfileForm.addEventListener('submit', handleFormSubmit);

newCardForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const name = placeNameInput.value;
    const link = placeLinkInput.value;

    const card = renderCard(name, link);
    cardsList.prepend(card);

    closeModal(addPopup);
    newCardForm.reset();
});

initialCards.forEach(({ name, link }) => {
    const card = renderCard(name, link);
    cardsList.append(card);
});