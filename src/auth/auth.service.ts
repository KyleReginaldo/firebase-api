import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { User } from 'src/models/user.model';
import {
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import {
  setDoc,
  DocumentReference,
  doc,
  getDoc,
  DocumentSnapshot,
  DocumentData,
} from 'firebase/firestore';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private firebaseService: FirebaseService) {}
  async login(email: string, password: string): Promise<User> {
    try {
      const userCreds = await signInWithEmailAndPassword(
        this.firebaseService.auth,
        email,
        password,
      );
      if (userCreds) {
        const id: string = userCreds.user.uid;
        const docRef: DocumentReference = doc(
          this.firebaseService.usersCollection,
          id,
        );
        const snapshot: DocumentSnapshot<DocumentData> = await getDoc(docRef);
        const user: User = {
          ...snapshot.data(),
          id: snapshot.id,
        } as User;

        delete user.password;
        return user;
      }
      console.log(userCreds.user.email);
    } catch (error) {
      console.warn(`[ERROR] ${error}`);
    }
  }
  async register(body: AuthDto): Promise<void> {
    try {
      const { name, email, password } = body;
      const userCreds: UserCredential = await createUserWithEmailAndPassword(
        this.firebaseService.auth,
        body.email,
        body.password,
      );
      if (userCreds) {
        const id: string = userCreds.user.uid;
        const docRef: DocumentReference = doc(
          this.firebaseService.usersCollection,
          id,
        );
        const user: User = {
          name,
          email,
          password,
          id,
        };
        await setDoc(docRef, user);
      }
    } catch (error: unknown) {
      console.warn(`[ERROR] ${error}`);
    }
  }
}
