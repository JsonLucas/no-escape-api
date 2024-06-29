import { UseCase } from "..";
import { GetUserProfileByIdInputDTO, IUser } from "../../domain/interfaces/user";
import { User } from "../../domain/user/entity/user";
import { UserGateway } from "../../domain/user/gateway/user.gateway";

export class GetUserByIdUsecase implements UseCase<GetUserProfileByIdInputDTO, IUser> {
    private constructor(private readonly userGateway: UserGateway){ }

    public static create(userGateway: UserGateway) {
        return new GetUserByIdUsecase(userGateway);
    }

    public async execute(userDTO: GetUserProfileByIdInputDTO): Promise<IUser> {
        const queryUser = await this.userGateway.getById(userDTO.id);

        const user = User.with(queryUser);

        const output = this.presentOutput(user);
        return output;
    }

    private presentOutput(user: User): IUser {
        const { id, name, email, phone, picture, password } = user;
        const output = { id, name, email, phone, picture, password };
        return output;
    }
}