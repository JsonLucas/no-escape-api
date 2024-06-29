import { UseCase } from "..";
import { GetTrackingByIdInputDTO, GetTrackingByIdOutputDTO } from "../../domain/interfaces/tracking";
import { Tracking } from "../../domain/tracking/entity/tracking";
import { ITrackingGateway } from "../../domain/tracking/gateway/tracking.gateway";

export class GetTrackingByIdUsecase implements UseCase<GetTrackingByIdInputDTO, GetTrackingByIdOutputDTO> {
    private constructor(private readonly trackingGateway: ITrackingGateway){ }

    public static create(trackingGateway: ITrackingGateway) {
        return new GetTrackingByIdUsecase(trackingGateway);
    }

    public async execute(trackingDTO: GetTrackingByIdInputDTO): Promise<GetTrackingByIdOutputDTO> {
        const trackingResponse = await this.trackingGateway.getById(trackingDTO.id);

        const output = this.presentOutput(trackingResponse);
        return output;
    }

    private presentOutput(tracking: Tracking): GetTrackingByIdOutputDTO {
        const { id, vehicleName, vehiclePlate, description } = tracking;
        return { 
            id, 
            vehicleName, 
            vehiclePlate, 
            description 
        };
    }
}