import { AppDataSource } from "./data-source"; 
import { Person } from "./entity/Person";

export const resolvers = {
  Query: {
    getPersons: async () => {
      const personRepository = AppDataSource.getRepository(Person); 
      return await personRepository.find(); 
    },
  },
  Mutation: {
    addPerson: async (_: any, args: any) => {
      const personRepository = AppDataSource.getRepository(Person); 
      const person = personRepository.create(args); 
      return await personRepository.save(person); 
    },
    updatePerson: async (_: any, { id, ...args }: any) => {
      const personRepository = AppDataSource.getRepository(Person);
      await personRepository.update(id, args); 
      return await personRepository.findOneBy({ id }); 
    },
    deletePerson: async (_: any, { id }: any) => {
      const personRepository = AppDataSource.getRepository(Person);
      const personId: number = parseInt(id, 10); 
    
      const person = await personRepository.findOneBy({ id: personId });
    
      if (!person) {
        throw new Error("Person not found");
      }
    
      await personRepository.delete(personId);
      
      console.log("Persona eliminada: ID", personId); 
    
      return personId; 
    }
    
    
  }     
}