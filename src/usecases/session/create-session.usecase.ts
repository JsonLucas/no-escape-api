import { UseCase } from "..";
import { ISession, ISessionGateway, CreateSessionInputDTO, CreateSessionOutputDTO } from "../../domain/interfaces/session";

export class CreateSessionUsecase implements UseCase<CreateSessionInputDTO, CreateSessionOutputDTO> {
    private constructor(private readonly sessionGateway: ISessionGateway){ }

    public static create(sessionGateway: ISessionGateway) {
        return new CreateSessionUsecase(sessionGateway);
    }

    public async execute(sessionDTO: CreateSessionInputDTO): Promise<CreateSessionOutputDTO> {
        const session = await this.sessionGateway.save(sessionDTO.userId);

        const output = this.presentOutput(session);
        return output;
    }

    private presentOutput(session: ISession): CreateSessionOutputDTO {
        const output = { id: session.id };
        return output;
    }
}