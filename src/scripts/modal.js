let currentPopup = null;

function handleEscClose(evt) {
  if (evt.key === 'Escape' && currentPopup) {
    closeModal(currentPopup);
  }
}

export function openModal(modal) {
  modal.classList.add('popup_is-opened');
  currentPopup = modal;
  document.addEventListener('keydown', handleEscClose);
}

export function closeModal(modal) {
  modal.classList.remove('popup_is-opened');
  currentPopup = null;
  document.removeEventListener('keydown', handleEscClose);
}
