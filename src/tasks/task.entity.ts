export class Task {
  title: string;
  description: string;
  userId: string;
  constructor(title: string, description: string, userId: string) {
    this.title = title;
    this.description = description;
    this.userId = userId;
  }
}
