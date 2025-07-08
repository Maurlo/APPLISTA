import "reflect-metadata";
import express, { Application } from "express";

import { ApolloServer } from "apollo-server-express"; 
import { AppDataSource } from "./data-source";
import { typeDefs } from "./schema"; 
import { resolvers } from "./resolvers";
import cors from "cors"; 

async function startServer() {
  const app: Application = express();

  app.use(cors()); 
  app.use(express.json());

  await AppDataSource.initialize()
  .then(() => {
    console.log("Conectado a la base de datos");

    app.listen(3000, () => {
      console.log("Servidor corriendo en http://localhost:3000");
    });
  })
    .catch((error) => console.log("Error de conexión a la base de datos", error));

  const server = new ApolloServer({
    typeDefs, 
    resolvers
  });

  await server.start();
  server.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("Servidor corriendo en http://localhost:4000/graphql");
  });
}

startServer();
