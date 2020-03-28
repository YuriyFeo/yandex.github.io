class FormValidator {
  constructor(objPopup) {
    this.objPopup = objPopup;
    this.words = {
      validationLenght: 'Должно быть от 2 до 30 символов',
      validationAvailable: 'Это обязательное поле',
      validationType: 'Должно быть URL'
    }
    this.msg = document.createElement('p');
    this.msg.classList.add('validator1');
    this.msg2 = document.createElement('p');
    this.msg2.classList.add('validator2');
  }
  setSubmitButtonState(state) {
    if (state) {
      this.objPopup.popupSubmit.removeAttribute('disabled')
      this.objPopup.popupSubmit.classList.add('edit__dark');
      return;
    }
    this.objPopup.popupSubmit.setAttribute('disabled', true);
    this.objPopup.popupSubmit.classList.remove('edit__dark');
  }

  checkInputValidity() {

    if (this.objPopup.popupName.validity.valid && this.objPopup.popupLink.validity.valid) {
      this.setSubmitButtonState(true);
      this.msg.textContent = '';
      this.objPopup.popupName.after(this.msg);
      this.msg2.textContent = '';
      this.objPopup.popupLink.after(this.msg2);
    } else {
      if (this.objPopup.popupName.validity.valueMissing) {
        this.setSubmitButtonState();
        this.msg.textContent = this.words.validationAvailable;
        this.objPopup.popupName.after(this.msg);
      } else if (this.objPopup.popupName.validity.tooShort || this.objPopup.popupName.validity.tooLong) {
        this.setSubmitButtonState();
        this.msg.textContent = this.words.validationLenght;
        this.objPopup.popupName.after(this.msg);
      } else {
        this.msg.textContent = '';
        this.objPopup.popupName.after(this.msg);
      }

      if (this.objPopup.popupLink.validity.valueMissing) {
        this.setSubmitButtonState();
        this.msg2.textContent = this.words.validationAvailable;
        this.objPopup.popupLink.after(this.msg2);
      } else if (this.objPopup.popupLink.validity.tooShort || this.objPopup.popupLink.validity.tooLong) {
        this.setSubmitButtonState();
        this.msg2.textContent = this.words.validationLenght;
        this.objPopup.popupLink.after(this.msg2);
      } else if (this.objPopup.popupLink.validity.typeMismatch) {
        this.setSubmitButtonState();
        this.msg2.textContent = this.words.validationType;
        this.objPopup.popupLink.after(this.msg2);
      } else {
        this.msg2.textContent = '';
        this.objPopup.popupLink.after(this.msg2);
      }
    }
  }
  setEventListeners() {
    this.objPopup.temp.addEventListener('input', event => this.checkInputValidity(this.objPopup.popupName, this.objPopup.popupLink, this.objPopup.popupSubmit));
  }
}