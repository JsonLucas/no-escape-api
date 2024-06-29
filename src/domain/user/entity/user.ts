import { IUser } from "../../interfaces/user";

export class User {
    private constructor(private user: IUser){ }
    
    public static create({ name, email, phone, password }: IUser) {
        return new User({
            id: 0,
            name, 
            email, 
            phone, 
            password
        });
    }

    public static with(user: IUser) {
        return new User(user);
    }

    public get id() {
        return this.user.id;
    }

    public get name() {
        return this.user.name;
    }

    public get email() {
        return this.user.email;
    }

    public get phone() {
        return this.user.phone;
    }

    public get password() {
        return this.user.password;
    }

    public get picture() {
        return this.user.picture
    }
}