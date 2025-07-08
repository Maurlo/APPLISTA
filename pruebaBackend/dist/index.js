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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const data_source_1 = require("./data-source");
const schema_1 = require("./schema");
const resolvers_1 = require("./resolvers");
const cors_1 = __importDefault(require("cors"));
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        app.use((0, cors_1.default)());
        app.use(express_1.default.json());
        yield data_source_1.AppDataSource.initialize()
            .then(() => {
            console.log("Conectado a la base de datos");
            app.listen(3000, () => {
                console.log("Servidor corriendo en http://localhost:3000");
            });
        })
            .catch((error) => console.log("Error de conexión a la base de datos", error));
        const server = new apollo_server_express_1.ApolloServer({
            typeDefs: schema_1.typeDefs,
            resolvers: resolvers_1.resolvers
        });
        yield server.start();
        server.applyMiddleware({ app });
        app.listen(4000, () => {
            console.log("Servidor corriendo en http://localhost:4000/graphql");
        });
    });
}
startServer();
