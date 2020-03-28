(function() {


    const api = new Api('c05d5c2c-cca1-4a95-af18-5dbe4b42a12a', 'https://praktikum.tk/cohort8');

    /*ссылки на DOM popup*/
    const popup = document.querySelector('.popup');
    const popupEdit = document.querySelector('.popup__edit');
    let img = document.querySelector('.popup__img');

    /*DOM CARD*/
    const form = document.forms.new;
    const popupOpen = document.querySelector('.user-info__button');

    /*DOM EDIT*/
    const nameEditField = document.querySelector('.user-info__name');
    const linkEditField = document.querySelector('.user-info__job');
    const popupEditBtn = document.querySelector('.user-info__edit');
    let userInfo = { name: nameEditField.textContent, link: linkEditField.textContent };

    //Создание объектов
    let card = new Card();

    Promise.all([
            api.getInitialCards(),
            api.getUser()
        ])
        .then(([initialCards, user]) => {
            userinfo.setUserInfo(user.name, user.about);
            userinfo.updateUserInfo(nameEditField, linkEditField);
            cardlist.render(initialCards);
        })
        .catch((err) => {
            console.log(err);
        });


    /* Надо исправить: обработка ошибок должны быть здесь, а не в классе Api */

    let userinfo = new UserInfo(userInfo);

    let userPopup = new PopupEdit(popupEdit);
    let cardPopup = new PopupCard(popup);
    let imgPopup = new ImgPopup(img);
    let cardlist = new CardList(document.querySelector('.places-list'), api, card, imgPopup);
    const userformvalidator = new FormValidator(userPopup);
    const cardformvalidator = new FormValidator(cardPopup);

    /*Слушатель кнопки SUBMIT на форме CARD*/
    document.forms.new.addEventListener('submit', function(event) {
        event.preventDefault();
        cardlist.addCard({ name: cardPopup.popupName.value, link: cardPopup.popupLink.value });
        cardPopup.close();
    });

    /*Слушатель кнопки SUBMIT на форме EDIT*/
    document.forms.edit.addEventListener('submit', function(event) {
        event.preventDefault();
        api.patchUser(userPopup.popupName.value, userPopup.popupLink.value)
            .then(user => {
                userinfo.setUserInfo(user.name, user.about);
                userinfo.updateUserInfo(nameEditField, linkEditField);
                userPopup.close();
            })
            .catch((err) => {
                console.log(err);
            });

        /* Надо исправить: обработка ошибок должны быть здесь, а не в классе Api */

        /*
            Надо исправить: все изменения на странице должны происходить, только после того, как
            сервер ответил подтверждением. Если сервер не ответил, или ответил ошибкой, а
            данные на странице сохраняться, то это может ввести пользователя в заблуждение

            Закрытие попапа делать так же только если запрос выполнился успешно т.е. в блоке then
        */

    });

    /*Слушатель кнопки на странице + */
    popupOpen.addEventListener('click', function(event) {
        cardPopup.open()
        cardformvalidator.checkInputValidity(userPopup.popupName, userPopup.popupLink, userPopup.popupSubmit);
    });

    /*Слушатель кнопки на странице Edit*/
    popupEditBtn.addEventListener('click', function(event) {
        userPopup.open(userinfo.elementEdit.name, userinfo.elementEdit.link);
        userformvalidator.checkInputValidity(userPopup.popupName, userPopup.popupLink, userPopup.popupSubmit);
    });

    /*Слушатели из классов*/
    userformvalidator.setEventListeners();
    cardformvalidator.setEventListeners();

    userPopup.setEventListeners();
    cardPopup.setEventListeners();
    imgPopup.setEventListeners();
    cardlist.setEventListeners();

})();

// см. Review4.md

/*
    Ревью по 9 проектной работе.

    Неплохая работа, класс Api создан и обеспечивает доступ к необходимым запросам сервера
    Отлично, что для запроса данных применен Promise.all
    Но есть замечания:

    Надо исправить: 
    - обработчики catch должны быть в конце запроса, а не в методах класса Api
    Иначе ошибка обработается и выполнение будет продолжено как будто её не было.
    - закрытие попапа делать только после того как запрос выполнился

    Можно лучше: 
    - проверка ответа сервера и преобразование из json
     дублируется во всех методах класса Api, лучше вынести в отдельный метод



*/