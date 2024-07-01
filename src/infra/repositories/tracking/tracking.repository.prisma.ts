import { PrismaClient } from "@prisma/client";
import { Tracking } from "../../../domain/tracking/entity/tracking";
import { ITracking } from "../../../domain/interfaces/tracking";
import { ITrackingGateway } from "../../../domain/tracking/gateway/tracking.gateway";

export class TrackingRepositoryPrisma implements ITrackingGateway {
    private constructor(private readonly prisma: PrismaClient) { }

    public static create(prisma: PrismaClient) {
        return new TrackingRepositoryPrisma(prisma);
    }

    public async save(tracking: Tracking): Promise<Tracking> {
        const { vehicleName, vehiclePlate, description, userId } = tracking
        const newTracking = await this.prisma.trackings.create({ data: { vehicleName, vehiclePlate, description, userId } });
        return Tracking.with(newTracking);
    }

    public async remove(id: number): Promise<void> {
        await this.prisma.trackings.delete({ where: { id } });
    }

    public async update(tracking: Tracking): Promise<void> {
        const { id, vehicleName, vehiclePlate, description } = tracking;
        await this.prisma.trackings.update({ data: { vehicleName, vehiclePlate, description }, where: { id } });
    }

    public async getAll(userId: number): Promise<Tracking[]> {
        const trackings = await this.prisma.trackings.findMany({ where: { userId } });
        return trackings.map((item) => {
            const { id, vehicleName, vehiclePlate, description, userId } = item;
            return Tracking.with({
                id, 
                vehicleName, 
                vehiclePlate, 
                description,
                userId
            });
        });
    }

    public async getById(id: number): Promise<Tracking> {
        const tracking = await this.prisma.trackings.findUnique({ where: { id } });
        if(tracking) return Tracking.with(tracking);

        return Tracking.with({} as ITracking); //TRACKING NOT FOUND
    }
}