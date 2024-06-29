import { PrismaClient } from "@prisma/client";
import { UserGateway } from "../../../domain/user/gateway/user.gateway";
import { User } from "../../../domain/user/entity/user";
import { IUser } from "../../../domain/interfaces/user";

export class UserRepositoryPrisma implements UserGateway {
    private constructor(private readonly prisma: PrismaClient) { }

    public static create(prisma: PrismaClient) {
        return new UserRepositoryPrisma(prisma);
    }

    public async save(user: User): Promise<User> {
        const { name, email, phone, password } = user;
        const createdUser = await this.prisma.users.create({ data: { name, email, phone, password } });
        
        return User.with(createdUser);
    }

    public async update(user: User): Promise<User> {
        const { name, password, id } = user;
        const data = password.length > 0 ? { name, password } : { name };
        const updated = await this.prisma.users.update({ data, where: { id } });

        return User.with(updated);
    }

    public async updatePicture(user: User): Promise<User> {
        const { id, picture } = user;
        const updated = await this.prisma.users.update({ data: { picture }, where: { id } });

        return User.with(updated);
    }

    public async getById(id: number): Promise<User> {
        const user = await this.prisma.users.findUnique({ where: { id } });
        if(user) return User.with(user);

        return User.with({} as IUser); //USER NOT FOUND
    }

    public async getByEmail(email: string): Promise<User> {
        const user = await this.prisma.users.findUnique({ where: { email } });
        if(user) return User.with(user);

        return User.with({} as IUser); //USER NOT FOUND
    }
}