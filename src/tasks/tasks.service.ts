import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import {
  setDoc,
  doc,
  DocumentReference,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(private firebaseService: FirebaseService) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<void> {
    const docRef: DocumentReference = doc(this.firebaseService.taskCollection);
    await setDoc(docRef, createTaskDto);
    console.log(docRef.firestore);
  }
  async getAllTasks(): Promise<Task[]> {
    const tasks = [];
    const colRef = this.firebaseService.taskCollection;
    const docSnap = await getDocs(colRef);
    docSnap.forEach((doc) => {
      console.log(doc.data());
      tasks.push(
        new Task(
          doc.data()['title'],
          doc.data()['description'],
          doc.data()['userId'],
        ),
      );
    });
    return tasks;
  }
  async getTasksById(id: string): Promise<Task[]> {
    const tasks = [];
    const colRef = this.firebaseService.taskCollection;
    const querySnap = query(colRef, where('userId', '==', id));
    const docSnap = await getDocs(querySnap);
    docSnap.forEach((doc) => {
      tasks.push(
        new Task(
          doc.data()['title'],
          doc.data()['description'],
          doc.data()['userId'],
        ),
      );
    });
    return tasks;
  }
}
