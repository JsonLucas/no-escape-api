import { Request, Response } from "express";
import { HttpMethod, IRoute } from "../route";
import { Validator } from "../../../../../helpers/Validator";
import { GetSessionByIdUsecase } from "../../../../../usecases/session/get-session-by-id.usecase";
import { GetTrackingByIdUsecase } from "../../../../../usecases/tracking/get-tracking-by-id";
import { GetAllTrackingsUsecase } from "../../../../../usecases/tracking/get-all-trackings.usecase";

export class GetTrackingsByUserIdRoute implements IRoute {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly getAllTrackingsService: GetAllTrackingsUsecase,
        private readonly getSessionService: GetSessionByIdUsecase
    ) {}

    public static create(getAllTrackingsService: GetAllTrackingsUsecase, getSessionService: GetSessionByIdUsecase) {
        return new GetTrackingsByUserIdRoute(
            "/tracking",
            HttpMethod.GET,
            getAllTrackingsService,
            getSessionService
        );
    }

    public getHandler() {
        return async (req: Request, res: Response) => {
            const sessionId = req.headers['x-session-id'];
            if(!sessionId) return res.status(401).send({ message: 'You don\'t have permission to access this resource.' });

            const session = await this.getSessionService.execute({ id: sessionId.toString() });
            if(!session.userId) return res.status(404).send({ message: 'Session not found.' });
            
            const trackings = await this.getAllTrackingsService.execute({ userId: session.userId });

            res.status(200).send(trackings);
        };
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        return this.method;
    }
}