import { PrismaStatesRepository } from "../../../repositories/prisma/PrismaStatesRepository";
import { FetchPlacesUseCase } from "../../../useCases/FetchPlacesUseCase";
import { FetchPlacesController } from "../FetchPlacesController";

export function makeFetchPlacesController(): FetchPlacesController {
  const statesRepository = new PrismaStatesRepository()

  const fetchPlacesUseCase = new FetchPlacesUseCase(statesRepository)

  const fetchPlacesController = new FetchPlacesController(fetchPlacesUseCase)

  return fetchPlacesController
}