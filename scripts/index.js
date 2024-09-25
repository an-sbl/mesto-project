// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(link, name, alt, deleteCard){
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector('.card__image').alt = alt;
    cardElement.querySelector('.card__title').textContent = name;
    deleteButton.addEventListener('click', deleteCard);
    return cardElement;
}

function appendCard(card){
    placesList.append(card);
}

// @todo: Функция удаления карточки
function removeCard(evt){
    const eventTarget = evt.target;
    const cardItem = eventTarget.closest('.card');
    cardItem.remove();
 }

// @todo: Вывести карточки на страницу

initialCards.forEach(function (cardInfo){
    const link = cardInfo.link;
    const name = cardInfo.name;
    const alt = cardInfo.alt;
    const card = createCard(link, name, alt, removeCard);
    appendCard(card);
});

/*
 Будущие наработки
// Вызов popup для добавления карточки и добавление рандомной карточки из массива
const addCardButton = document.querySelector('.profile__add-button');
const popUpCard = document.querySelector('.popup_type_new-card');
const popupSave = popUpCard.querySelector('.popup__button');
const popupClose = popUpCard.querySelector('.popup__close');

addCardButton.addEventListener('click', openPopUpCard);
popupClose.addEventListener('click', closePopUpCard);


popupSave.addEventListener('click', function () {

    const popupForm = popUpCard.querySelector('.popup__form');

    let numCard = Math.floor(Math.random() * 6);
    let link = initialCards[numCard].link;
    let name = initialCards[numCard].name;
    let formInputName = popupForm.querySelector('.popup__input_type_card-name');
    let formInputLink = popupForm.querySelector('.popup__input_type_url');
    formInputName.textContent = name;
    formInputLink.textContent = link;
    let card = createCard(link, name, removeCard);
    closePopUpCard();
});
function openPopUpCard(){
    popUpCard.classList.add('popup_is-opened');
}

function closePopUpCard(){
    popUpCard.classList.remove('popup_is-opened');
}
*/
