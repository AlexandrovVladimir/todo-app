export interface TodoModel {
  id: number;
  name: string;
  description: string;
  completed?: boolean;
  createdAt: string | object;
  completedAt?: string | object;
  expireDate?: string | object;
}
