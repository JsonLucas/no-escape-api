import { UseCase } from "..";
import { ISession, ISessionGateway, SessionExistsInputDTO, SessionExistsOutputDTO } from "../../domain/interfaces/session";

export class GetSessionByIdUsecase implements UseCase<SessionExistsInputDTO, SessionExistsOutputDTO> {
    private constructor(private readonly sessionGateway: ISessionGateway){ }

    public static create(sessionGateway: ISessionGateway) {
        return new GetSessionByIdUsecase(sessionGateway);
    }

    public async execute(sessionDTO: SessionExistsInputDTO): Promise<SessionExistsOutputDTO> {
        const session = await this.sessionGateway.getById(sessionDTO.id);

        const output = this.presentOutput(session);
        return output;
    }

    private presentOutput(session: ISession): SessionExistsOutputDTO {
        const output = { userId: session.userId };
        return output;
    }
}