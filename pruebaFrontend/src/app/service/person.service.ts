import { Injectable } from "@angular/core";
import { Apollo, gql } from "apollo-angular";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Person } from "../models/person.model";

const GET_PERSONS = gql`
  query {
    getPersons {
      id
      firstName
      lastNameP
      lastNameM
      address
      phone
    }
  }
`;

const ADD_PERSON = gql`
  mutation AddPerson($firstName: String!, $lastNameP: String!, $lastNameM: String!, $address: String!, $phone: String!) {
    addPerson(firstName: $firstName, lastNameP: $lastNameP, lastNameM: $lastNameM, address: $address, phone: $phone) {
      id
      firstName
      lastNameP
      lastNameM
      address
      phone
    }
  }
`;

const UPDATE_PERSON = gql`
  mutation UpdatePerson($id: ID!, $firstName: String!, $lastNameP: String!, $lastNameM: String!, $address: String!, $phone: String!) {
    updatePerson(id: $id, firstName: $firstName, lastNameP: $lastNameP, lastNameM: $lastNameM, address: $address, phone: $phone) {
      id
      firstName
      lastNameP
      lastNameM
      address
      phone
    }
  }
`;

const DELETE_PERSON = gql`
  mutation deletePerson($id: ID!) {
    deletePerson(id: $id)
  }
`;

@Injectable({ providedIn: "root" })
export class PersonService {
  constructor(private apollo: Apollo) {}

  getPersons(): Observable<Person[]> {
    return this.apollo.watchQuery<{ getPersons: Person[] }>({
      query: GET_PERSONS,
    }).valueChanges.pipe(map((result) => result.data.getPersons));
  }

  addPerson(person: Person): Observable<any> {
    return this.apollo.mutate({
      mutation: ADD_PERSON,
      variables: {
        firstName: person.firstName,
        lastNameP: person.lastNameP,
        lastNameM: person.lastNameM,
        address: person.address,
        phone: person.phone,
      },
      refetchQueries: [{ query: GET_PERSONS }], 
    });
  }

  updatePerson(person: Person): Observable<any> {
    return this.apollo.mutate({
      mutation: UPDATE_PERSON,
      variables: {
        id: person.id,
        firstName: person.firstName,
        lastNameP: person.lastNameP,
        lastNameM: person.lastNameM,
        address: person.address,
        phone: person.phone,
      },
      refetchQueries: [{ query: GET_PERSONS }], 
    });
  }

  deletePerson(id: string): Observable<any> {
    return this.apollo.mutate({
      mutation: DELETE_PERSON,
      variables: { id },
    });
  }
}