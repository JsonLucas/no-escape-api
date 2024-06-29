import { ITracking } from "../../interfaces/tracking";

export class Tracking {
    private constructor(private tracking: ITracking){ }
    
    public static create({ vehicleName, vehiclePlate, description }: ITracking) {
        return new Tracking({
            id: 0,
            vehicleName,
            vehiclePlate,
            description,
            userId: 0
        });
    }

    public static with(tracking: ITracking) {
        return new Tracking(tracking);
    }

    public get id() {
        return this.tracking.id;
    }

    public get userId() {
        return this.tracking.userId;
    }

    public get vehicleName() {
        return this.tracking.vehicleName;
    }

    public get vehiclePlate() {
        return this.tracking.vehiclePlate;
    }

    public get description() {
        return this.tracking.description;
    }
}