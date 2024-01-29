type Technology = {
  id: string
  name: string
}

export interface ITechnologiesRepository {
  getAll(): Promise<Technology[]>
}