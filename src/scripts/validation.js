const showInputError = (formElement, inputElement, errorMessage, { inputErrorClass, errorClass }) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, { inputErrorClass, errorClass }) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(errorClass);
};

const checkInputValidity = (formElement, inputElement, options) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  }
  else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, options);
  } else {
    hideInputError(formElement, inputElement, options);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

export const disableSubmitButton = (button, { inactiveButtonClass }) => {
  button.disabled = true;
  button.classList.add(inactiveButtonClass);
};

const enableSubmitButton = (button, { inactiveButtonClass }) => {
  button.disabled = false;
  button.classList.remove(inactiveButtonClass);
}

const toggleButtonState = (inputList, buttonElement, options) => {
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(buttonElement, options);
  } else {
    enableSubmitButton(buttonElement, options);
  }
};

const setEventListeners = (formElement, options) => {
  const inputList = Array.from(formElement.querySelectorAll(options.inputSelector));
  const buttonElement = formElement.querySelector(options.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, options);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, options);
      toggleButtonState(inputList, buttonElement, options);
    });

    inputElement.addEventListener('blur', () => {
      checkInputValidity(formElement, inputElement, options);
    });
  });
};

export const enableValidation = (options) => {
  const formList = Array.from(document.querySelectorAll(options.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, options);
  });
};

export const clearValidation = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const submitButton = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach((inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`);
    inputElement.classList.remove(config.inputErrorClass);
    
    if (errorElement) {
      errorElement.textContent = '';
      errorElement.classList.remove(config.errorClass);
    }
    inputElement.setCustomValidity('');
  });
  disableSubmitButton(submitButton, config);
};