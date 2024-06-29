import { UseCase } from "..";
import { ISessionGateway, SessionExistsInputDTO } from "../../domain/interfaces/session";

export class RemoveSessionUsecase implements UseCase<SessionExistsInputDTO, void> {
    private constructor(private readonly sessionGateway: ISessionGateway){ }

    public static create(sessionGateway: ISessionGateway) {
        return new RemoveSessionUsecase(sessionGateway);
    }

    public async execute(sessionDTO: SessionExistsInputDTO): Promise<void> {
        await this.sessionGateway.remove(sessionDTO.id);
    }
}