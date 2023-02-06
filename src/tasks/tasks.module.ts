import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { FirebaseService } from 'src/firebase/firebase.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [TasksController],
  providers: [TasksService, FirebaseService],
})
export class TasksModule {}
