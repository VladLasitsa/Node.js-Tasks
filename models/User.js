"use strict";

class User {
    constructor() {
        this.users = [{
            id: "test-person-1",
            name: "Vlad Lasitsa",
            login: "vlad1",
            password: "1234"
        }]
        console.log("User module");
    }

    findUserByLoginAndPassword(userData) {
        return this.users.find(user => user.login === userData.login && user.password === userData.password);
    }

    getList() {
        return this.users;
    }
}

export default User;