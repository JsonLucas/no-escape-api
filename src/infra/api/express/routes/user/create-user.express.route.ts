import { Request, Response } from "express";
import { HttpMethod, IRoute } from "../route";
import { CreateUserUsecase } from "../../../../../usecases/user/create-user.usecase";
import { UserInputDTO, UserOutputDTO } from "../../../../../domain/interfaces/user";
import { Validator } from "../../../../../helpers/Validator";
import { Crypto } from "../../../../../helpers/Crypto";
import { createUserSchema } from "../../../../../utils/schema";
import { CreateSessionUsecase } from "../../../../../usecases/session/create-session.usecase";

export class CreateUserRoute implements IRoute {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly createUserService: CreateUserUsecase,
        private readonly createSessionService: CreateSessionUsecase,
        private readonly validator: Validator,
        private readonly crypto: Crypto
    ) {}

    public static create(createUserService: CreateUserUsecase, createSessionService: CreateSessionUsecase, validator: Validator, crypto: Crypto) {
        return new CreateUserRoute(
            "/users",
            HttpMethod.POST,
            createUserService,
            createSessionService,
            validator,
            crypto
        );
    }

    public getHandler() {
        return async (req: Request, res: Response) => {
            const { body } = req;
            const validator = await this.validator.validate(createUserSchema, body);
            if(!validator) return res.status(422).send({ message: 'Invalid object format.' });
            
            const { name, email, phone, password } = body;
            const encryptPassword = this.crypto.encrypt(password);
            
            const input: UserInputDTO = { name, email, phone, password: encryptPassword };
            const output: UserOutputDTO = await this.createUserService.execute(input);
            const session = await this.createSessionService.execute({ userId: output.id });

            res.status(201).send({ message: 'User successfuly created!', session: session.id });
        };
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        return this.method;
    }
}