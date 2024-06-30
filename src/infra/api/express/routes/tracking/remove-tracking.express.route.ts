import { Request, Response } from "express";
import { HttpMethod, IRoute } from "../route";
import { GetSessionByIdUsecase } from "../../../../../usecases/session/get-session-by-id.usecase";
import { RemoveTrackingUsecase } from "../../../../../usecases/tracking/remove-tracking.usecase";

export class RemoveTrackingRoute implements IRoute {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly removeTrackingService: RemoveTrackingUsecase,
        private readonly getSessionService: GetSessionByIdUsecase
    ) {}

    public static create(removeTrackingService: RemoveTrackingUsecase, getSessionService: GetSessionByIdUsecase) {
        return new RemoveTrackingRoute(
            "/tracking/:id",
            HttpMethod.DELETE,
            removeTrackingService,
            getSessionService
        );
    }

    public getHandler() {
        return async (req: Request, res: Response) => {
            const { params } = req;
            
            try {
                const sessionId = req.headers['x-session-id'];
                if(!sessionId) return res.status(401).send({ message: 'You don\'t have permission to access this resource.' });

                const session = await this.getSessionService.execute({ id: sessionId.toString() });
                if(!session.userId) return res.status(404).send({ message: 'Session not found.' });

                if(!params.id || (params.id && isNaN(Number(params.id)))) return res.status(400).send({ message: 'You must to provide a valid tracking id.' });

                const tracking = await this.removeTrackingService.execute({ id: Number(params.id) });
                res.status(204).send({ message: 'Tracking successfuly deleted.' });
            } catch(e: any) {
                console.log(e);
                let errorMessage = "Internal server error. Contact the support for more details.";
                if(e.meta) return res.status(404).send({ message: e.meta.cause });
                
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