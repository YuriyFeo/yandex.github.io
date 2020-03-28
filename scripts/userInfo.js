class UserInfo {
    constructor(elementEdit) {
        this.elementEdit = elementEdit;
    }
    setUserInfo(newname, newjob) {
        this.elementEdit.name = newname;
        this.elementEdit.link = newjob;
    }
    updateUserInfo(nameEditField, linkEditField) {
        nameEditField.textContent = this.elementEdit.name;
        linkEditField.textContent = this.elementEdit.link;

    }
}