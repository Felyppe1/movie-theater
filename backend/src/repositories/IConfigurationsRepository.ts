import { Configuration } from "../@Types/Configuration"

export type ConfigurationsCreateDTO = Omit<Configuration, 'id'>

export type ConfigurationsUpdateDTO = ConfigurationsCreateDTO

export interface IConfigurationsRepository {
  create(data: ConfigurationsCreateDTO): Promise<Configuration>
  getAll(): Promise<Configuration[]>
  update(data: ConfigurationsUpdateDTO): Promise<Configuration>
}