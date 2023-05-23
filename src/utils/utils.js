const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  errorClass: 'popup__input-error_active',
  inputErrorClass: 'popup__input_invalid',
};

const profileAvatar = document.querySelector('.profile__avatar');
const profileEditProfileButton = document.querySelector('.button_type_edit-profile');
const popupButtonAddPlace = document.querySelector('.button_type_add');
const profileNameInput = document.querySelector('.popup__input_el_name');
const profileOccupationInput = document.querySelector('.popup__input_el_job');


export { config, profileAvatar, profileEditProfileButton,popupButtonAddPlace, profileNameInput, profileOccupationInput };
