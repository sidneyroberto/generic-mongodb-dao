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
exports.GenericDAO = void 0;
const mongodb_1 = require("mongodb");
class GenericDAO {
    constructor(db, collectionName) {
        this._collection = db.collection(collectionName);
    }
    create(obj) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._collection.insertOne(obj);
            return result.insertedId.toString();
        });
    }
    update(id, obj) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = { _id: new mongodb_1.ObjectId(id) };
            const options = { upsert: false };
            const result = yield this._collection.updateOne(filter, { $set: obj }, options);
            return result.matchedCount > 0;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = { _id: new mongodb_1.ObjectId(id) };
            const result = yield this._collection.deleteOne(filter);
            return result.deletedCount > 0;
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = { _id: new mongodb_1.ObjectId(id) };
            const result = (yield this._collection.findOne(filter));
            return result;
        });
    }
}
exports.GenericDAO = GenericDAO;
