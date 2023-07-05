export interface ICreateNote {
  id?: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}
