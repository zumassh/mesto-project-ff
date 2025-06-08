let currentPopup = null;

const handleEscClose = (evt) => {
  if (evt.key === 'Escape' && currentPopup) {
    closeModal(currentPopup);
  }
}

export const openModal = (modal) => {
  modal.classList.add('popup_is-opened');
  currentPopup = modal;
  document.addEventListener('keydown', handleEscClose);
}

export const closeModal = (modal) => {
  modal.classList.remove('popup_is-opened');
  currentPopup = null;
  document.removeEventListener('keydown', handleEscClose);
}
