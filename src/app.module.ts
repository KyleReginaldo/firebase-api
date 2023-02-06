import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { FirebaseService } from './firebase/firebase.service';
import { ConfigModule } from '@nestjs/config';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [AuthModule, ConfigModule.forRoot({}), TasksModule],
  providers: [FirebaseService],
})
export class AppModule {}
