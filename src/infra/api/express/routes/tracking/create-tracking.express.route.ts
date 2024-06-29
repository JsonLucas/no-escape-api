import { Request, Response } from "express";
import { HttpMethod, IRoute } from "../route";
import { Validator } from "../../../../../helpers/Validator";
import { trackingSchema } from "../../../../../utils/schema";
import { CreateTrackingUsecase } from "../../../../../usecases/tracking/create-tracking.usecase";
import { GetSessionByIdUsecase } from "../../../../../usecases/session/get-session-by-id.usecase";
import { UNSUPPORTED_OBJECT } from "../../../../../utils/httpResponse";

export class CreateTrackingRoute implements IRoute {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly createTrackingService: CreateTrackingUsecase,
        private readonly getSessionService: GetSessionByIdUsecase,
        private readonly validator: Validator
    ) {}

    public static create(createTrackingService: CreateTrackingUsecase, getSessionService: GetSessionByIdUsecase, validator: Validator) {
        return new CreateTrackingRoute(
            "/tracking",
            HttpMethod.POST,
            createTrackingService,
            getSessionService,
            validator
        );
    }

    public getHandler() {
        return async (req: Request, res: Response) => {
            const { body } = req;
            const validator = await this.validator.validate(trackingSchema, body);
            if(!validator) return res.status(UNSUPPORTED_OBJECT.code).send(UNSUPPORTED_OBJECT);
            
            const sessionId = req.headers['x-session-id'];
            if(!sessionId) return res.status(401).send({ message: 'You don\'t have permission to access this resource.' });

            const session = await this.getSessionService.execute({ id: sessionId.toString() });
            if(!session.userId) return res.status(404).send({ message: 'Session not found.' });

            await this.createTrackingService.execute({ ...req.body, userId: session.userId });

            res.status(201).send({ message: 'Tracking successfuly created!' });
        };
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        return this.method;
    }
}