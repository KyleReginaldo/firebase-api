import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Config } from 'src/models/config.model';
import { Auth, getAuth } from 'firebase/auth';
import {
  CollectionReference,
  Firestore,
  collection,
  getFirestore,
} from 'firebase/firestore';
@Injectable()
export class FirebaseService {
  public app: FirebaseApp;
  public auth: Auth;
  public usersCollection: CollectionReference;
  public taskCollection: CollectionReference;
  public firestore: Firestore;
  constructor(private configService: ConfigService<Config>) {
    this.app = initializeApp({
      apiKey: configService.get<string>('apiKey'),
      appId: configService.get<string>('appId'),
      authDomain: configService.get<string>('authDomain'),
      measurementId: configService.get<string>('measurementId'),
      messagingSenderId: configService.get<string>('messagingSenderId'),
      projectId: configService.get<string>('projectId'),
      storageBucket: configService.get<string>('storageBucket'),
    });
    this.auth = getAuth(this.app);
    this.firestore = getFirestore(this.app);
    this._createUsersCollection();
    this._createTasksCollection();
  }
  private _createUsersCollection() {
    this.usersCollection = collection(this.firestore, 'users');
  }
  private _createTasksCollection() {
    this.taskCollection = collection(this.firestore, 'tasks');
  }
}
