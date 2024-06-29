import { Request, Response } from "express";
import { HttpMethod, IRoute } from "../route";
import { GetSessionByIdUsecase } from "../../../../../usecases/session/get-session-by-id.usecase";
import { GetTrackingByIdUsecase } from "../../../../../usecases/tracking/get-tracking-by-id";

export class GetTrackingByIdRoute implements IRoute {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly getTrackingService: GetTrackingByIdUsecase,
        private readonly getSessionService: GetSessionByIdUsecase
    ) {}

    public static create(getTrackingService: GetTrackingByIdUsecase, getSessionService: GetSessionByIdUsecase) {
        return new GetTrackingByIdRoute(
            "/tracking/:id",
            HttpMethod.GET,
            getTrackingService,
            getSessionService
        );
    }

    public getHandler() {
        return async (req: Request, res: Response) => {
            const { params } = req;
            
            const sessionId = req.headers['x-session-id'];
            if(!sessionId) return res.status(401).send({ message: 'You don\'t have permission to access this resource.' });

            const session = await this.getSessionService.execute({ id: sessionId.toString() });
            if(!session.userId) return res.status(404).send({ message: 'Session not found.' });

            if(!params.id || (params.id && Number(params.id))) return res.status(400).send({ message: 'You must to provide a valid tracking id.' });

            const tracking = await this.getTrackingService.execute({ id: Number(params.id) });

            res.status(200).send(tracking);
        };
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        return this.method;
    }
}