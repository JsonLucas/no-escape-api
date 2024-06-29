import { UseCase } from "..";
import { UpdateTrackingInputDTO } from "../../domain/interfaces/tracking";
import { Tracking } from "../../domain/tracking/entity/tracking";
import { ITrackingGateway } from "../../domain/tracking/gateway/tracking.gateway";

export class UpdateTrackingUsecase implements UseCase<UpdateTrackingInputDTO, void> {
    private constructor(private readonly trackingGateway: ITrackingGateway){ }

    public static create(trackingGateway: ITrackingGateway) {
        return new UpdateTrackingUsecase(trackingGateway);
    }

    public async execute(trackingDTO: UpdateTrackingInputDTO): Promise<void> {
        const tracking = Tracking.with({ ...trackingDTO, userId: 0 });
        await this.trackingGateway.update(tracking);
    }
}