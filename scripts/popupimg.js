class ImgPopup {
    constructor(temp) {
        this.temp = temp;
        this.popupClose = temp.querySelector('.popup__close');
        this.img = this.temp.querySelector('.img');
    }
    open(event) {
        if (event.target.classList.contains('place-card__image')) {
            this.img.src = event.target.getAttribute('style').replace(/background-image: url\(|\)$/ig, "");
            this.temp.classList.add('popup_is-opened');
        }
    }
    close() {
        this.temp.classList.remove('popup_is-opened');
    }
    setEventListeners() {
        this.popupClose.addEventListener('click', () => this.close());
    }
}