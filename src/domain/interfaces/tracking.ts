export interface ITracking {
    id: number,
    vehicleName: string,
    vehiclePlate: string,
    description?: string | null,
    userId: number
}

export type CreateTrackingInputDTO = Omit<ITracking, 'id'>;
export type CreateTrackingOutputDTO = Pick<ITracking, 'id'>;

export type UpdateTrackingInputDTO = Omit<ITracking, 'userId'>;

export type GetAllTrackingsInputDTO = Pick<ITracking, 'userId'>;
export type GetAllTrackingsOutputDTO = Omit<ITracking, 'userId'>[];

export type GetTrackingByIdInputDTO = Pick<ITracking, 'id'>;
export type GetTrackingByIdOutputDTO = Omit<ITracking, 'userId'>;

export type RemoveTrackingInputDTO = Pick<ITracking, 'id'>;