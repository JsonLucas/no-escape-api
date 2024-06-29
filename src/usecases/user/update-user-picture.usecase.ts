import { UseCase } from "..";
import { UpdateUserPictureInputDTO } from "../../domain/interfaces/user";
import { User } from "../../domain/user/entity/user";
import { UserGateway } from "../../domain/user/gateway/user.gateway";

export class UpdateUserPictureUsecase implements UseCase<UpdateUserPictureInputDTO, void> {
    private constructor(private readonly userGateway: UserGateway){ }

    public static create(userGateway: UserGateway) {
        return new UpdateUserPictureUsecase(userGateway);
    }

    public async execute(userDTO: UpdateUserPictureInputDTO): Promise<void> {
        const user = User.with({ ...userDTO, email: '', password: '', phone: '', name: '' });
        
        await this.userGateway.updatePicture(user);
    }
}