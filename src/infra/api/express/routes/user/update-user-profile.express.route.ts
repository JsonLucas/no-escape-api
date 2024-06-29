import { Request, Response } from "express";
import { HttpMethod, IRoute } from "../route";
import { Validator } from "../../../../../helpers/Validator";
import { Crypto } from "../../../../../helpers/Crypto";
import { loginSchema, updateUserSchema } from "../../../../../utils/schema";
import { UNSUPPORTED_OBJECT, USER_NOT_FOUND } from "../../../../../utils/httpResponse";
import { UpdateUserProfileUsecase } from "../../../../../usecases/user/update-user-profile.usecase";
import { GetSessionByIdUsecase } from "../../../../../usecases/session/get-session-by-id.usecase";

export class UpdateUserProfileRoute implements IRoute {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly updateUserProfileService: UpdateUserProfileUsecase,
        private readonly getSessionService: GetSessionByIdUsecase,
        private readonly validator: Validator,
        private readonly crypto: Crypto
    ) {}

    public static create(updateUserProfileService: UpdateUserProfileUsecase, getSessionService: GetSessionByIdUsecase, validator: Validator, crypto: Crypto) {
        return new UpdateUserProfileRoute(
            "/users",
            HttpMethod.PUT,
            updateUserProfileService,
            getSessionService,
            validator,
            crypto
        );
    }

    public getHandler() {
        return async (req: Request, res: Response) => {
            const { body, headers } = req;
            const validator = await this.validator.validate(updateUserSchema, body);
            if(!validator) return res.status(UNSUPPORTED_OBJECT.code).send(UNSUPPORTED_OBJECT);

            const sessionId = headers['x-session-id'];
            if(!sessionId) return res.status(401).send({ message: 'You don\'t have permission to access this resource.' });

            const session = await this.getSessionService.execute({ id: sessionId.toString() });
            if(!session.userId) return res.status(404).send({ message: 'Session not found.' });

            const { password } = body;
            const encryptedPassword = password.length > 0 ? this.crypto.encrypt(password) : '';

            const user = { ...body, id: session.userId, password: encryptedPassword };
            await this.updateUserProfileService.execute(user);

            res.status(200).send({ message: 'User successfuly updated!' });
        };
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        return this.method;
    }
}