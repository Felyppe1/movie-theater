import { Configuration } from "../@Types/Configuration"

type ConfigurationsCreateDTO = Omit<Configuration, 'id'>

type ConfigurationsUpdateDTO = ConfigurationsCreateDTO

export interface IConfigurationsRepository {
  create(data: ConfigurationsCreateDTO): Promise<Configuration>
  getAll(): Promise<Configuration[]>
  update(data: ConfigurationsUpdateDTO): Promise<Configuration[]>
}