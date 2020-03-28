class CardList {
    constructor(container, api, card, imgpopup) {
        this.container = container;
        this.card = card;
        this.api = api;
        this.imgPopup = imgpopup;
    }
    addCard(card) {
        const { name, link, owner, likes, _id } = card;
        let element = this.card.create(name, link, owner, likes, _id);
        this.container.append(element);
    }
    render(initialCards) {
        for (let { name, link, owner, likes, _id }
            of initialCards) {
            this.addCard({ name, link, owner, likes, _id });
        }
    }
    setEventListeners() {
        this.container.addEventListener('click', event => this.eventSplit(event));
    }
    eventSplit(event) {
        if (event.target.classList.contains('place-card__like-icon')) {
            this.card.like(event)
        } else if (event.target.classList.contains('place-card__delete-icon')) {
            this.card.remove(event)
        } else if (event.target.classList.contains('place-card__image')) {
            this.imgPopup.open(event);
        };
    }
}