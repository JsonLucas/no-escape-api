import { Tracking } from "../entity/tracking";

export interface ITrackingGateway {
    save: (tracking: Tracking) => Promise<Tracking>,
    update: (tracking: Tracking) => Promise<void>,
    getById: (id: number) => Promise<Tracking>,
    getAll: (userId: number) => Promise<Tracking[]>,
    remove: (id: number) => Promise<void>
}