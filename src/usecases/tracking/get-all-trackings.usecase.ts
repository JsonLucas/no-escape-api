import { UseCase } from "..";
import { GetAllTrackingsInputDTO, GetAllTrackingsOutputDTO } from "../../domain/interfaces/tracking";
import { Tracking } from "../../domain/tracking/entity/tracking";
import { ITrackingGateway } from "../../domain/tracking/gateway/tracking.gateway";

export class GetAllTrackingsUsecase implements UseCase<GetAllTrackingsInputDTO, GetAllTrackingsOutputDTO> {
    private constructor(private readonly trackingGateway: ITrackingGateway){ }

    public static create(trackingGateway: ITrackingGateway) {
        return new GetAllTrackingsUsecase(trackingGateway);
    }

    public async execute(trackingDTO: GetAllTrackingsInputDTO): Promise<GetAllTrackingsOutputDTO> {
        const trackingResponse = await this.trackingGateway.getAll(trackingDTO.userId);

        const output = this.presentOutput(trackingResponse);
        return output;
    }

    private presentOutput(tracking: Tracking[]): GetAllTrackingsOutputDTO {
        return tracking.map((item) => ({
            id: item.id,
            vehicleName: item.vehicleName,
            vehiclePlate: item.vehiclePlate,
            description: item.description
        }));
    }
}