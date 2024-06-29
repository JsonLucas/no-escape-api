import { UseCase } from "..";
import { IUser, LoginInputDTO, UserInputDTO } from "../../domain/interfaces/user";
import { User } from "../../domain/user/entity/user";
import { UserGateway } from "../../domain/user/gateway/user.gateway";

export class GetUserByEmailUsecase implements UseCase<UserInputDTO, IUser> {
    private constructor(private readonly userGateway: UserGateway){ }

    public static create(userGateway: UserGateway) {
        return new GetUserByEmailUsecase(userGateway);
    }

    public async execute(userDTO: LoginInputDTO): Promise<IUser> {
        const queryUser = await this.userGateway.getByEmail(userDTO.email);

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