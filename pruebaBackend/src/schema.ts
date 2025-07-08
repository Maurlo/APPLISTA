import { gql } from "apollo-server-express";

export const typeDefs = gql`
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
