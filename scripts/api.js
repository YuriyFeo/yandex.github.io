class Api {
    constructor(token, server) {
        this.token = token;
        this.server = server;
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }




    getInitialCards() {
        // return this.makeFetch('cards');
        return fetch(`${this.server}/cards`, {
                headers: {
                    authorization: this.token,
                    'Content-Type': 'application/json',
                }
            })
            /*
                Можно лучше: запись в одну строку нечитаема
            
                проверка ответа сервера и преобразование из json
                дублируется во всех методах класса Api, лучше вынести в отдельный метод:
                    _getResponseData(res) {
                        if (!res.ok) {
                            return Promise.reject(`Ошибка: ${res.status}`); 
                        }
                        return res.json();
                    }
                Подчеркивание в начале имени метода говорит о том, что метод является приватным, т.е.
                не используется вне класса Api   
            */
            .then(res => this._getResponseData(res))
            /*
                Надо исправить: здесь и далее в остальных методах, из метода класса возвращается промис, и его обработка продолжается там, где метод
                класса Api был вызван. Получается обработчик catch который располагается здесь находится в 
                середине цепочки then. Он обработает ошибку и выполнение продолжится как будто ошибки 
                не было. Из за это например при ошибке запроса карточек с сервера падает ошибка:
                TypeError: initialCards is not iterable
                    at CardList.render (cardlist.js:15)
                    at script.js:31
                т.е. несмотря на то что карточки с сервера не пришли, программа попыталась отрисовать их
                и упала с ошибкой, такое поведение недопустимо.

                Поэтому нужно поместить блок catch только в самом конце цепочки
            */
            /*   .catch((err) => {
                   console.log(err);
               });*/
    }

    getUser() {
        return fetch(this.server + '/users/me', {
                headers: {
                    authorization: this.token
                }
            })
            .then(res => this._getResponseData(res))
            /*   .catch((err) => {
                   console.log(err);
               });*/
    }

    patchUser(newName, newAbout) {
        return fetch(this.server + '/users/me', {
                method: 'PATCH',
                headers: {
                    authorization: this.token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: `${newName}`,
                    about: `${newAbout}`
                })
            })
            .then(res => this._getResponseData(res))
            /*  .catch((err) => {
                  console.log(err);
              });*/
    }

}