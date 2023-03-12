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
exports.UserDAO = void 0;
const GenericDAO_1 = require("./GenericDAO");
class UserDAO extends GenericDAO_1.GenericDAO {
    constructor(db) {
        super(db, 'users');
    }
    findByBirthdayPeriod(start, end) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.find({
                birthday: {
                    $gte: start,
                    $lte: end,
                },
            });
            return users;
        });
    }
}
exports.UserDAO = UserDAO;
