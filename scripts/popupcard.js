class PopupCard {
    constructor(temp) {
        this.temp = temp;
        this.popupClose = temp.querySelector('.popup__close');
        this.popupName = temp.querySelector('.popup__input_type_name');
        this.popupLink = temp.querySelector('.popup__input_type_link-url');
        this.form = temp.querySelector('.popup__form');
        this.popupSubmit = temp.querySelector('.button');
    }
    open() {
        this.temp.classList.add('popup_is-opened');
    }
    close() {
        this.temp.classList.remove('popup_is-opened');
        this.form.reset();
    }
    setEventListeners() {
        this.popupClose.addEventListener('click', event => this.close());
    }

}