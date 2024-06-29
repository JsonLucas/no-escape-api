import { UseCase } from "..";
import { IUser } from "../../domain/interfaces/user";
import { User } from "../../domain/user/entity/user";
import { UserGateway } from "../../domain/user/gateway/user.gateway";

export class UpdateUserProfileUsecase implements UseCase<IUser, void> {
    private constructor(private readonly userGateway: UserGateway){ }

    public static create(userGateway: UserGateway) {
        return new UpdateUserProfileUsecase(userGateway);
    }

    public async execute(userDTO: IUser): Promise<void> {
        const user = User.with(userDTO);
        
        await this.userGateway.update(user);
    }
}