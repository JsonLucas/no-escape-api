import { Request, Response } from "express";
import { HttpMethod, IRoute } from "../route";
import { GetSessionByIdUsecase } from "../../../../../usecases/session/get-session-by-id.usecase";
import { Validator } from "../../../../../helpers/Validator";
import { trackingSchema } from "../../../../../utils/schema";
import { UNSUPPORTED_OBJECT } from "../../../../../utils/httpResponse";
import { UpdateTrackingUsecase } from "../../../../../usecases/tracking/update-tracking.usecase";
import { GetAllTrackingsUsecase } from "../../../../../usecases/tracking/get-all-trackings.usecase";

export class UpdateTrackingRoute implements IRoute {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly updateTrackingService: UpdateTrackingUsecase,
        private readonly getAllTrackingsService: GetAllTrackingsUsecase,
        private readonly getSessionService: GetSessionByIdUsecase,
        private readonly validator: Validator
    ) {}

    public static create(updateTrackingService: UpdateTrackingUsecase, getAllTrackingsService: GetAllTrackingsUsecase, getSessionService: GetSessionByIdUsecase, validator: Validator) {
        return new UpdateTrackingRoute(
            "/tracking/:id",
            HttpMethod.PUT,
            updateTrackingService,
            getAllTrackingsService,
            getSessionService,
            validator
        );
    }

    public getHandler() {
        return async (req: Request, res: Response) => {
            const { params, body } = req;
            const validator = await this.validator.validate(trackingSchema, body);
            if(!validator) return res.status(UNSUPPORTED_OBJECT.code).send(UNSUPPORTED_OBJECT);
            
            const sessionId = req.headers['x-session-id'];
            if(!sessionId) return res.status(401).send({ message: 'You don\'t have permission to access this resource.' });

            const session = await this.getSessionService.execute({ id: sessionId.toString() });
            if(!session.userId) return res.status(404).send({ message: 'Session not found.' });

            if(!params.id || (params.id && isNaN(Number(params.id)))) return res.status(400).send({ message: 'You must to provide a valid tracking id.' });
            const trackingId = Number(params.id);

            const allTrackings = await this.getAllTrackingsService.execute({ userId: session.userId });
            if(allTrackings.some((item) => item.vehiclePlate === body.vehiclePlate && item.id !== trackingId)) return res.status(409).send({ message: 'You already have a vehicle with this plate.' });

            await this.updateTrackingService.execute({ ...body, id: trackingId });

            res.status(200).send({ message: 'Tracking successfuly updated!' });
        };
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        return this.method;
    }
}