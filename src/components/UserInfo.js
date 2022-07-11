export default class UserInfo {
    constructor(userDataSelectors) {
        this._userName = document.querySelector(userDataSelectors.userName);
        this._userDescription = document.querySelector(userDataSelectors.userDescription);
        this._userAvatar = document.querySelector(userDataSelectors.userAvatar);
        this._id = null;
    }

    getUserInfo(name, occupation) {
            this._userName.textContent = name;
            this._userDescription.textContent = occupation;
    }

    setUserInfo(userData) {
        this._userName.textContent = userData.name;
        this._userDescription.textContent = userData.about;
        this._userAvatar.src = userData.avatar;
        this._id = userData._id;
    }
    getUserId() {
        return this._id;
    }

    getUserAvatar(imageLink) {
         this._userAvatar.src = imageLink;
     }
}