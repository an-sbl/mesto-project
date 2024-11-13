import '../pages/index.css';
import './cardsDB.js';
import './validation.js';
import {createCard, removeCard, handleLikeCard} from './cards.js'
import {openModal, closeModal, addPopupListeners} from './modal.js'
import {toggleButtonState, setEventListeners, hideInputError} from './validation.js'
import {initialCards} from './cardsDB.js';

// Вывод карточки на страницу

const placesList = document.querySelector('.places__list');

initialCards.forEach(function (cardInfo){
    const link = cardInfo.link;
    const name = cardInfo.name;
    const alt = cardInfo.alt;
    const card = createCard(link, name, alt, removeCard, addPopupListenersImage, handleLikeCard);
    prependCard(card);
});

const profileEditButton = document.querySelector('.profile__edit-button');
const popUpEditProfile = document.querySelector('.popup_type_edit');
const addCardButton = document.querySelector('.profile__add-button');
const popUpAddCard = document.querySelector('.popup_type_new-card');
const popUpImage = document.querySelector('.popup_type_image');
    
addPopupListeners(popUpEditProfile);
addPopupListeners(popUpAddCard);
addPopupListeners(popUpImage);

// Обработка попапа картинки карточки

function addPopupListenersImage(name, link, altText){
    popUpImage.querySelector('.popup__image').src = link;
    popUpImage.querySelector('.popup__image').alt = altText;
    popUpImage.querySelector('.popup__caption').textContent = name;
    openModal(popUpImage);
}

// Обработка редактирования профиля

const formEdit = document.forms.editProfile;          
const nameInput = formEdit.querySelector('.popup__input_type_name');
const jobInput =  formEdit.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');


profileEditButton.addEventListener('click', function(){
    clearValidation(formEdit, validationConfig);
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
    openModal(popUpEditProfile);
    }
);

function handleEditProfileFormSubmit(evt) {
        evt.preventDefault();
        profileName.textContent = nameInput.value;
        profileDescription.textContent = jobInput.value;
        closeModal(popUpEditProfile);
    }


formEdit.addEventListener('submit', handleEditProfileFormSubmit);

// Обработка добавления карточки

const formCard = document.forms.newPlace;
const cardNnameInput = formCard.querySelector('.popup__input_type_card-name');
const cardUrlInput =  formCard.querySelector('.popup__input_type_url');

addCardButton.addEventListener('click', function(){
  clearValidation(formCard, validationConfig);
  cardNnameInput.value = "";
  cardUrlInput.value = "";
  openModal(popUpAddCard);
}
);

function handleAddCardFormSubmit(evt) {
        evt.preventDefault();
        const card = createCard(cardUrlInput.value, cardNnameInput.value, "Описание картинки", removeCard, addPopupListenersImage, handleLikeCard);
        prependCard(card);
        formCard.reset();
        closeModal(popUpAddCard);
    }
formCard.addEventListener('submit', handleAddCardFormSubmit);

function prependCard(card){
    placesList.prepend(card);
  }


//Валидация форм
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'form__input-error-active'
}
  const enableValidation = (validationConfig) => {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
    formList.forEach((formElement) => {
      setEventListeners(formElement, validationConfig);
    });
  };
  
  const clearValidation = (formElement, validationConfig) => {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
    inputList.forEach((inputElement) => {
      hideInputError(formElement, inputElement,validationConfig);
      toggleButtonState(inputList, buttonElement); 
    });
   
  };

  enableValidation(validationConfig);
 