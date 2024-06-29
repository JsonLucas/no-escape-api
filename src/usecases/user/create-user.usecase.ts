import { UseCase } from "..";
import { UserInputDTO, UserOutputDTO } from "../../domain/interfaces/user";
import { User } from "../../domain/user/entity/user";
import { UserGateway } from "../../domain/user/gateway/user.gateway";

export class CreateUserUsecase implements UseCase<UserInputDTO, UserOutputDTO> {
    private constructor(private readonly userGateway: UserGateway){ }

    public static create(userGateway: UserGateway) {
        return new CreateUserUsecase(userGateway);
    }

    public async execute(userDTO: UserInputDTO): Promise<UserOutputDTO> {
        const user = User.create({ ...userDTO, id: 0 });
        
        const createdUser = await this.userGateway.save(user);

        const output = this.presentOutput(createdUser);
        return output;
    }

    private presentOutput(user: User): UserOutputDTO {
        const output = { id: user.id };
        return output;
    }
}