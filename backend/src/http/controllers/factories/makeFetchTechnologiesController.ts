import { PrismaTechnologiesRepository } from "../../../repositories/prisma/PrismaTechnologiesRepository";
import { FetchTechnologiesUseCase } from "../../../useCases/FetchTechnologiesUseCase";
import { FetchTechnologiesController } from "../FetchTechnologiesController";

export function makeFetchTechnologiesController(): FetchTechnologiesController {
  const technologiesRepository = new PrismaTechnologiesRepository()

  const fetchTechnologiesUseCase = new FetchTechnologiesUseCase(technologiesRepository)

  const fetchTechnologiesController = new FetchTechnologiesController(fetchTechnologiesUseCase)

  return fetchTechnologiesController
}