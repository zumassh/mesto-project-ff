import './pages/index.css';
import { closeModal, openModal } from './scripts/modal';
import { createCard, likeCard, removeCard } from './scripts/card';
import { enableValidation, clearValidation } from './scripts/validation.js';
import { getUser, getCards, setUser, addCard, changeAvatar } from './scripts/api.js';

const cardTemplate = document.querySelector('#card-template').content;
const cardsList = document.querySelector('.places__list');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const cardPicturePopup = document.querySelector('.popup_type_image');
const editPopup = document.querySelector('.popup_type_edit');
const addPopup = document.querySelector('.popup_type_new-card');
const avatarPopup = document.querySelector('.popup_type_avatar');

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');

const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

const editProfileForm = document.forms['edit-profile'];

const newCardForm = document.forms['new-place'];
const placeNameInput = newCardForm.querySelector('.popup__input_type_card-name');
const placeLinkInput = newCardForm.querySelector('.popup__input_type_url');

const avatarForm = document.forms['change-avatar'];
const avatarLinkInput = avatarForm.querySelector('.popup__avatar_input_type_url');

let userId = null;

Promise.all([getUser(), getCards()])
    .then(([userData, cardsArr]) => {
        profileName.textContent = userData.name;
        profileDescription.textContent = userData.about;
        profileAvatar.style.backgroundImage = `url('${userData.avatar}')`;
        userId = userData._id;

        cardsArr.forEach((c) => {
            const card = renderCard(c.name, c.link, c.owner._id, c._id, c.likes);
            cardsList.append(card);
        });
    })
    .catch((err) => {
        console.log(err);
    });

const openCard = (link, name) => {
    const popupImage = cardPicturePopup.querySelector('.popup__image');
    const popupCaption = cardPicturePopup.querySelector('.popup__caption');
    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;
    openModal(cardPicturePopup);
}

function renderCard(name, link, ownerId, cardId, likes) {
    const cardElement = createCard(
        cardTemplate,
        name,
        link,
        removeCard,
        likeCard,
        openCard,
        ownerId,
        userId,
        cardId,
        likes
    );
    return cardElement;
}

editButton.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
    clearValidation(editProfileForm, validationConfig);
    nameInput.dispatchEvent(new Event('input'));
    jobInput.dispatchEvent(new Event('input'));
    openModal(editPopup);
});

addButton.addEventListener('click', () => {
    newCardForm.reset();
    clearValidation(newCardForm, validationConfig);
    const submitButton = newCardForm.querySelector(validationConfig.submitButtonSelector);
    submitButton.disabled = true;
    submitButton.classList.add(validationConfig.inactiveButtonClass);
    openModal(addPopup);
});

profileAvatar.addEventListener('click', () => {
    avatarForm.reset();
    clearValidation(avatarForm, validationConfig);
    const submitButton = avatarForm.querySelector(validationConfig.submitButtonSelector);
    submitButton.disabled = true;
    submitButton.classList.add(validationConfig.inactiveButtonClass);
    openModal(avatarPopup);
})

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

editProfileForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    let name = nameInput.value;
    let job = jobInput.value;

    profileName.textContent = name;
    profileDescription.textContent = job;

    const submitButton = evt.target.querySelector('.popup__button');
    submitButton.textContent = 'Сохранение...';

    setUser(name, job)
        .then((result) => {
            console.log(result)
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
            submitButton.textContent = 'Сохранить';
            closeModal(editPopup);
        });
});

newCardForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const name = placeNameInput.value;
    const link = placeLinkInput.value;
    const submitButton = evt.target.querySelector('.popup__button');

    submitButton.textContent = 'Сохранение...';
    submitButton.disabled = true;

    addCard(name, link)
        .then((cardData) => {
            const card = renderCard(
                cardData.name,
                cardData.link,
                cardData.owner._id,
                cardData._id,
                cardData.likes
            );
            cardsList.prepend(card);
        })
        .catch((err) => {
            console.error('Ошибка при добавлении карточки:', err);
        })
        .finally(() => {
            submitButton.textContent = 'Сохранить';
            closeModal(addPopup);
            newCardForm.reset();
        });
});

avatarForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const avatarLink = avatarLinkInput.value;
    const submitButton = evt.target.querySelector('.popup__button');
    submitButton.textContent = 'Сохранение...';

    changeAvatar(avatarLink)
        .then((result) => {
            profileAvatar.style.backgroundImage = `url('${result.avatar}')`;
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
            submitButton.textContent = 'Сохранить';
            closeModal(avatarPopup);
            avatarForm.reset();
        });
});

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'form__input-error_active'
};

enableValidation(validationConfig);

clearValidation(editProfileForm, validationConfig);
clearValidation(newCardForm, validationConfig);
clearValidation(avatarForm, validationConfig);