import { UseCase } from "..";
import { RemoveTrackingInputDTO } from "../../domain/interfaces/tracking";
import { ITrackingGateway } from "../../domain/tracking/gateway/tracking.gateway";

export class RemoveTrackingUsecase implements UseCase<RemoveTrackingInputDTO, void> {
    private constructor(private readonly trackingGateway: ITrackingGateway){ }

    public static create(trackingGateway: ITrackingGateway) {
        return new RemoveTrackingUsecase(trackingGateway);
    }

    public async execute(trackingDTO: RemoveTrackingInputDTO): Promise<void> {
        await this.trackingGateway.remove(trackingDTO.id);
    }
}