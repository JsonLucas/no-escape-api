import { Request, Response } from "express";
import { HttpMethod, IRoute } from "../route";
import { Validator } from "../../../../../helpers/Validator";
import { Crypto } from "../../../../../helpers/Crypto";
import { loginSchema } from "../../../../../utils/schema";
import { GetUserByEmailUsecase } from "../../../../../usecases/user/get-user-by-email.usecase";
import { UNSUPPORTED_OBJECT, USER_NOT_FOUND } from "../../../../../utils/httpResponse";
import { CreateSessionUsecase } from "../../../../../usecases/session/create-session.usecase";

export class UserLoginRoute implements IRoute {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly getUserByEmailService: GetUserByEmailUsecase,
        private readonly createSessionService: CreateSessionUsecase,
        private readonly validator: Validator,
        private readonly crypto: Crypto
    ) {}

    public static create(getUserByEmailService: GetUserByEmailUsecase, createSessionService: CreateSessionUsecase, validator: Validator, crypto: Crypto) {
        return new UserLoginRoute(
            "/users/login",
            HttpMethod.POST,
            getUserByEmailService,
            createSessionService,
            validator,
            crypto
        );
    }

    public getHandler() {
        return async (req: Request, res: Response) => {
            const { body } = req;
            const validator = await this.validator.validate(loginSchema, body);
            if(!validator) return res.status(UNSUPPORTED_OBJECT.code).send(UNSUPPORTED_OBJECT);

            const { email, password } = body;
            const user = await this.getUserByEmailService.execute({ email });
            if(user.id) {
                const decryptedPassword = this.crypto.decrypt(user.password);
                if(password === decryptedPassword) {
                    const session = await this.createSessionService.execute({ userId: user.id });
                    return res.status(200).send({ message: 'Successuly login.', session: session.id });
                }
            }

            res.status(USER_NOT_FOUND.code).send(USER_NOT_FOUND);
        };
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        return this.method;
    }
}