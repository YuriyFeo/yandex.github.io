class Card {
    constructor(element) {}
    like(event) {
        event.target.classList.toggle('place-card__like-icon_liked');
    }
    remove(event) {
        event.target.closest('.place-card').remove();
    }
    create(cardName, cardURL) {
        const cardContainer = document.createElement('div');
        const placeCardImage = document.createElement('div');
        const placeCardDeleteIcon = document.createElement('button');
        const placeCardDescription = document.createElement('div');
        const placeCardName = document.createElement('h3');
        const placeCardLikeIcon = document.createElement('button');

        cardContainer.classList.add('place-card');
        placeCardImage.classList.add('place-card__image');
        placeCardImage.setAttribute('style', 'background-image: url(' + cardURL + ')');
        placeCardDeleteIcon.classList.add('place-card__delete-icon');
        placeCardDescription.classList.add('place-card__description');
        placeCardName.classList.add('place-card__name');
        placeCardName.textContent = cardName;
        placeCardLikeIcon.classList.add('place-card__like-icon');

        cardContainer.appendChild(placeCardImage);
        placeCardImage.appendChild(placeCardDeleteIcon);
        cardContainer.appendChild(placeCardDescription);
        placeCardDescription.appendChild(placeCardName);
        placeCardDescription.appendChild(placeCardLikeIcon);

        return cardContainer;
    }
}