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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const data_source_1 = require("./data-source");
const Person_1 = require("./entity/Person");
exports.resolvers = {
    Query: {
        getPersons: () => __awaiter(void 0, void 0, void 0, function* () {
            const personRepository = data_source_1.AppDataSource.getRepository(Person_1.Person);
            return yield personRepository.find();
        }),
    },
    Mutation: {
        addPerson: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const personRepository = data_source_1.AppDataSource.getRepository(Person_1.Person);
            const person = personRepository.create(args);
            return yield personRepository.save(person);
        }),
        updatePerson: (_, _a) => __awaiter(void 0, void 0, void 0, function* () {
            var { id } = _a, args = __rest(_a, ["id"]);
            const personRepository = data_source_1.AppDataSource.getRepository(Person_1.Person);
            yield personRepository.update(id, args);
            return yield personRepository.findOneBy({ id });
        }),
        deletePerson: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id }) {
            const personRepository = data_source_1.AppDataSource.getRepository(Person_1.Person);
            const personId = parseInt(id, 10); // Convertimos el ID a número
            const person = yield personRepository.findOneBy({ id: personId });
            if (!person) {
                throw new Error("Person not found");
            }
            yield personRepository.delete(personId);
            console.log("Persona eliminada: ID", personId); // Solo imprimimos el ID
            return personId; // Solo devolvemos el ID
        })
    }
};
