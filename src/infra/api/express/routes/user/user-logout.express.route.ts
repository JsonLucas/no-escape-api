import { Request, Response } from "express";
import { HttpMethod, IRoute } from "../route";
import { RemoveSessionUsecase } from "../../../../../usecases/session/remove-session.usecase";

export class UserLogoutRoute implements IRoute {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly removeSessionService: RemoveSessionUsecase,
    ) {}

    public static create(removeSessionService: RemoveSessionUsecase) {
        return new UserLogoutRoute(
            "/users/logout",
            HttpMethod.DELETE,
            removeSessionService
        );
    }

    public getHandler() {
        return async (req: Request, res: Response) => {
            const sessionId = req.headers['x-session-id'];
            if(!sessionId) return res.status(401).send({ message: 'You don\'t have permission to access this resource.' });

            try {
                await this.removeSessionService.execute({ id: sessionId.toString() });

                res.status(200).send({ message: 'Successfuly logged out.' });
            } catch(e: any) {
                let errorMessage = "Internal server error. Contact the support for more details.";
                if(e.meta) errorMessage = e.meta.cause;
                
                res.status(500).send({ message: errorMessage });
            }
        };
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        return this.method;
    }
}