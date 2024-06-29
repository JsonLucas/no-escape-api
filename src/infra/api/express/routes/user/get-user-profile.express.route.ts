import { query, Request, Response } from "express";
import { HttpMethod, IRoute } from "../route";
import { UNSUPPORTED_OBJECT, USER_NOT_FOUND } from "../../../../../utils/httpResponse";
import { UpdateUserProfileUsecase } from "../../../../../usecases/user/update-user-profile.usecase";
import { GetSessionByIdUsecase } from "../../../../../usecases/session/get-session-by-id.usecase";
import { GetUserByIdUsecase } from "../../../../../usecases/user/get-user-by-id.usecase";

export class UserProfileRoute implements IRoute {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly getUserByIdService: GetUserByIdUsecase,
        private readonly getSessionService: GetSessionByIdUsecase
    ) {}

    public static create(getUserByIdService: GetUserByIdUsecase, getSessionService: GetSessionByIdUsecase) {
        return new UserProfileRoute(
            "/users",
            HttpMethod.GET,
            getUserByIdService,
            getSessionService
        );
    }

    public getHandler() {
        return async (req: Request, res: Response) => {
            const { headers } = req;

            const sessionId = headers['x-session-id'];
            if(!sessionId) return res.status(401).send({ message: 'You don\'t have permission to access this resource.' });

            const session = await this.getSessionService.execute({ id: sessionId.toString() });
            if(!session.userId) return res.status(404).send({ message: 'Session not found.' });
            
            const queryUser = await this.getUserByIdService.execute({ id: session.userId });
            if(!queryUser.id) return res.status(USER_NOT_FOUND.code).send(USER_NOT_FOUND);

            const { name, email, phone, picture } = queryUser;

            res.status(200).send({ name, email, phone, picture });
        };
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        return this.method;
    }
}