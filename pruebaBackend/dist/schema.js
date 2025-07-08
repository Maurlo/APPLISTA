"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDefs = (0, apollo_server_express_1.gql) `
  type Person {
    id: ID!
    firstName: String!
    lastNameP: String!
    lastNameM: String!
    address: String!
    phone: String!
  }

  type Query {
    getPersons: [Person]
  }

  type Mutation {
  addPerson(firstName: String!, lastNameP: String!, lastNameM: String!, address: String!, phone: String!): Person
  updatePerson(id: ID!, firstName: String, lastNameP: String, lastNameM: String, address: String, phone: String): Person
  deletePerson(id: ID!): ID!
}
`;
