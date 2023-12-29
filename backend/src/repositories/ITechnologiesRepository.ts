import { Technology } from "@prisma/client";

export interface ITechnologiesRepository {
  getAll(): Promise<Technology[]>
}