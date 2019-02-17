"use strict";

class User {
    constructor() {
        this.users = [{
            id: "test-person-1",
            name: "Vlad Lasitsa"
        }]
        console.log("User module");
    }

    getList() {
        return this.users;
    }
}

export default User;