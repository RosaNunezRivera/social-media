'use strict';

//Class User
class User {
    #id;
    #fullname;
    #user;
    #email;

    constructor(id, fullname, user, email) {
        this.#id = id;
        this.#fullname = fullname;
        this.#user = user;
        this.#email = email;
    }

    set id(id) {
        this.#id = id;
    }

    set fullname(fullname) {
        this.#fullname = fullname;
    }

    set user(user) {
        this.#user = user;
    }

    set email(email) {
        this.#email = email;
    }

    get id() {
        return this.#id;
    }

    get fullname() {
        return this.#fullname;
    }

    get user() {
        return this.#user;
    }

    get email() {
        return this.#email;
    }

    getInfo() {
        return `${this.#id},${this.#fullname},${this.#user},${this.#email}`;

    }
}

class Suscriber extends User {
    #pages;
    #groups;
    #canMonetize;

    constructor(id, fullname, user, email, pages, groups, canMonetize) {
        super(id, fullname, user, email);
        this.#pages = pages;
        this.#groups = groups;
        this.#canMonetize = canMonetize;
    }

    set pages(pages) {
        this.#pages = pages;
    }

    set groups(groups) {
        this.#groups = groups;
    }

    set canMonetize(canMonetize) {
        this.#canMonetize = canMonetize;
    }

    get pages() { return this.#pages; }
    get groups() { return this.#groups; }
    get canMonetize() { return this.#canMonetize; }

    getInfoSuscriber() {
        let response = `${this.id},${this.fullname},${this.user},${this.email},${this.#pages},${this.#groups},${this.#canMonetize}`;
        return response;
    }

}

//Export functions
export { User, Suscriber };
