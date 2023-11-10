import Realm from 'realm';
import {RegisterSchema} from '../schema/RegisterSchema';
import { Dogschema } from '../schema/DogListSchema';


const realm = new Realm({schema: [Dogschema]});

export const getAllData = () => {
  const data = realm.objects('Dog');
  return Array.from(data); 
};

export const deleteAll = () => {
  realm.write(() => {
    realm.deleteAll();
  });
};


