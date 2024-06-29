import { UseCase } from "..";
import { CreateTrackingInputDTO, CreateTrackingOutputDTO } from "../../domain/interfaces/tracking";
import { Tracking } from "../../domain/tracking/entity/tracking";
import { ITrackingGateway } from "../../domain/tracking/gateway/tracking.gateway";

export class CreateTrackingUsecase implements UseCase<CreateTrackingInputDTO, CreateTrackingOutputDTO> {
    private constructor(private readonly trackingGateway: ITrackingGateway){ }

    public static create(trackingGateway: ITrackingGateway) {
        return new CreateTrackingUsecase(trackingGateway);
    }

    public async execute(trackingDTO: CreateTrackingInputDTO): Promise<CreateTrackingOutputDTO> {
        const tracking = Tracking.with({ ...trackingDTO, id: 0 });
        const trackingResponse = await this.trackingGateway.save(tracking);

        const output = this.presentOutput(trackingResponse);
        return output;
    }

    private presentOutput(tracking: Tracking): CreateTrackingOutputDTO {
        const output = { id: tracking.id };
        return output;
    }
}