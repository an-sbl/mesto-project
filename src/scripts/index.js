import '../pages/index.css';
import './validation.js';
import {createCard, removeCard, likeCard, handleLikeCard} from './cards.js'
import {openModal, closeModal, addPopupListeners} from './modal.js'
import {enableValidation, clearValidation} from './validation.js'
import {requestEditProfile, requestEditProfileImage, requestAddCard, requestDeleteCard,requestProfile, requestCard} from './api.js'

const placesList = document.querySelector('.places__list');

const profileEditButton = document.querySelector('.profile__edit-button');
const popUpEditProfile = document.querySelector('.popup_type_edit');
const addCardButton = document.querySelector('.profile__add-button');
const popUpAddCard = document.querySelector('.popup_type_new-card');
const popUpImage = document.querySelector('.popup_type_image');
const popUpImageProfile = document.querySelector('.popup_type_edit-profile-image');
    
addPopupListeners(popUpEditProfile);
addPopupListeners(popUpAddCard);
addPopupListeners(popUpImage);
addPopupListeners(popUpImageProfile);

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
const formEditProfileImage = document.forms.editProfileImage;    
const profileImageInput =  formEditProfileImage.querySelector('.popup__input_type_url_profile');  
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const profileImageButton = document.querySelector('.profile__image-container');
let userId;

profileEditButton.addEventListener('click', function(){
   clearValidation(formEdit, validationConfig);
   returnSaveButtonText(formEdit);
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
    openModal(popUpEditProfile);
    }
);

profileImageButton.addEventListener('click', function(){
  clearValidation(formEditProfileImage, validationConfig);
  returnSaveButtonText(formEditProfileImage);
  profileImageInput.value = "";
  openModal(popUpImageProfile);
  }
);

function handleEditProfileFormSubmit(evt) {
        waitFormSavingInfo(formEdit);
        evt.preventDefault();
        const newProfile = {};
        newProfile.name = nameInput.value;
        newProfile.about = jobInput.value;
        requestEditProfile(newProfile)
        .then((result) => {
          console.log(result);
          profileName.textContent = result.name;
          profileDescription.textContent=  result.about;
          closeModal(popUpEditProfile);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() =>{
          waitFormSavingInfo(formEdit);
        });
}

function handleEditProfileImageFormSubmit(evt) {
  waitFormSavingInfo(formEditProfileImage);
  evt.preventDefault();
  requestEditProfileImage(profileImageInput.value)
        .then((result) => {     
          profileImage.setAttribute("src", profileImageInput.value);
          formEditProfileImage.reset();
          closeModal(popUpImageProfile);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() =>{
          waitFormSavingInfo(formEditProfileImage);
        });
 
}

formEdit.addEventListener('submit', handleEditProfileFormSubmit);
formEditProfileImage.addEventListener('submit', handleEditProfileImageFormSubmit);
// Обработка добавления карточки

const formCard = document.forms.newPlace;
const cardNnameInput = formCard.querySelector('.popup__input_type_card-name');
const cardUrlInput =  formCard.querySelector('.popup__input_type_url');

addCardButton.addEventListener('click', function(){
  clearValidation(formCard, validationConfig);
  returnSaveButtonText(formCard);
  cardNnameInput.value = "";
  cardUrlInput.value = "";
  openModal(popUpAddCard);
}
);

function handleAddCardFormSubmit(evt) {
  waitFormSavingInfo(formCard);
        evt.preventDefault();
        const newCard = {};
        newCard.name = cardNnameInput.value;
        newCard.link = cardUrlInput.value;
        requestAddCard(newCard)
        .then((cardInfo) => {
          const card = createCard(cardInfo.link, cardInfo.name, "Описание картинки", 0,cardInfo['_id'], userId, cardInfo.owner['_id'], handleDeleteCard, addPopupListenersImage, handleLikeCard);
          prependCard(card);
          formCard.reset();
          closeModal(popUpAddCard);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() =>{
          waitFormSavingInfo(formCard);
        });
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
 

  enableValidation(validationConfig);
 
//Проверка загрузки профиля и карточек
  const promises = [requestProfile,requestCard];
  Promise.all(promises)
    .then(([resProfile, resCards]) => {
      profileName.textContent = resProfile.name;
      profileDescription.textContent = resProfile.about;
      profileImage.setAttribute("src", resProfile.avatar);
      userId = resProfile["_id"];
      resCards.forEach(function (cardInfo){
        const link = cardInfo.link;
        const name = cardInfo.name;
        const alt = cardInfo.name;
        const card = createCard(link, name, alt, cardInfo.likes.length, cardInfo["_id"], userId, cardInfo.owner["_id"], handleDeleteCard, addPopupListenersImage, handleLikeCard);
        cardInfo.likes.forEach((like) => {
          like['_id'] == userId && likeCard(card);
          })
        prependCard(card);
      });
    })
    .catch((err) => {
      console.log(err);
    }); 

const handleDeleteCard = (evt) => {
  const cardItem = evt.target.closest('.card');
  requestDeleteCard(cardItem.id)
  .then((res)=> {
    removeCard(cardItem);
  })
  .catch((err) => {
    console.log(err);
  }); 
};


const waitFormSavingInfo = (formElement) => {
  const saveButton = formElement.querySelector('.popup__button');
  saveButton.textContent = "Сохранение...";

};

const returnSaveButtonText = (formElement) => {
  const saveButton = formElement.querySelector('.popup__button');
  saveButton.textContent = "Сохранить";

};
