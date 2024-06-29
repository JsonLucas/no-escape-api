import { Request, Response } from "express";
import { HttpMethod, IRoute } from "../route";
import { Validator } from "../../../../../helpers/Validator";
import { updateProfilePictureSchema,  } from "../../../../../utils/schema";
import { UNSUPPORTED_OBJECT } from "../../../../../utils/httpResponse";
import { GetSessionByIdUsecase } from "../../../../../usecases/session/get-session-by-id.usecase";
import { UpdateUserPictureUsecase } from "../../../../../usecases/user/update-user-picture.usecase";
import { Upload } from "../../../../../helpers/Upload";
import { S3 } from "aws-sdk";

export class UpdateUserPictureRoute implements IRoute {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly updateUserPictureService: UpdateUserPictureUsecase,
        private readonly getSessionService: GetSessionByIdUsecase,
        private readonly validator: Validator,
        private readonly upload: Upload
    ) {}

    public static create(updateUserPictureService: UpdateUserPictureUsecase, getSessionService: GetSessionByIdUsecase, validator: Validator, upload: Upload) {
        return new UpdateUserPictureRoute(
            "/users/picture",
            HttpMethod.PATCH,
            updateUserPictureService,
            getSessionService,
            validator,
            upload
        );
    }

    public getHandler() {
        return async (req: Request, res: Response) => {
            const { body, headers } = req;

            const validator = await this.validator.validate(updateProfilePictureSchema, body);
            if(!validator) return res.status(UNSUPPORTED_OBJECT.code).send(UNSUPPORTED_OBJECT);

            const sessionId = headers['x-session-id'];
            if(!sessionId) return res.status(401).send({ message: 'You don\'t have permission to access this resource.' });

            const session = await this.getSessionService.execute({ id: sessionId.toString() });
            if(!session.userId) return res.status(404).send({ message: 'Session not found.' });

            const { picture } = body;
            const uploaded = await this.upload.sendFile(picture, session.userId) as S3.ManagedUpload.SendData;

            await this.updateUserPictureService.execute({ id: session.userId, picture: uploaded.Location });

            res.status(200).send({ message: 'User picture successfuly updated!' });
        };
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        return this.method;
    }
}