"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const User_1 = require("./src/models/User");
const UserDAO_1 = require("./src/dao/UserDAO");
const faker_1 = require("@faker-js/faker");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield mongodb_1.MongoClient.connect('mongodb://localhost');
    const db = connection.db('users_management');
    faker_1.faker.locale = 'pt_BR';
    let firstName = faker_1.faker.name.firstName();
    let lastName = faker_1.faker.name.lastName();
    let fullName = `${firstName} ${lastName}`;
    let email = faker_1.faker.internet.email(firstName, lastName);
    let birthday = faker_1.faker.date.past(50);
    const user1 = new User_1.User(fullName, email, birthday);
    const dao = new UserDAO_1.UserDAO(db);
    let id = yield dao.create(user1);
    console.log(id);
    const users = yield dao.findByBirthdayPeriod(new Date('1980-01-01T00:00:00.000Z'), new Date());
    users.forEach((u) => console.log(u));
    let currentUser = yield dao.findOne(id);
    console.log(currentUser);
    const newEmail = faker_1.faker.internet.email(firstName, lastName);
    const updated = yield dao.update(id, { email: newEmail });
    console.log(updated);
    currentUser = yield dao.findOne(id);
    console.log(currentUser);
    firstName = faker_1.faker.name.firstName();
    lastName = faker_1.faker.name.lastName();
    fullName = `${firstName} ${lastName}`;
    email = faker_1.faker.internet.email(firstName, lastName);
    birthday = faker_1.faker.date.past(50);
    const newUser = new User_1.User(fullName, email, birthday);
    id = yield dao.create(newUser);
    console.log(id);
    const deleted = yield dao.delete(id);
    console.log(deleted);
});
main().then(() => process.exit(0));
