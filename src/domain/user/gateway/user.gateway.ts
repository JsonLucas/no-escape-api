import { User } from "../entity/user";

export interface UserGateway {
    save: (user: User) => Promise<User>,
    update: (user: User) => Promise<User>,
    updatePicture: (user: User) => Promise<User>,
    getById: (id: number) => Promise<User>,
    getByEmail: (email: string) => Promise<User>
}