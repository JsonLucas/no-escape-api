import { PrismaClient } from "@prisma/client";
import { ISession, ISessionGateway } from "../../../domain/interfaces/session";

export class SessionRepositoryPrisma implements ISessionGateway {
    private constructor(private readonly prisma: PrismaClient) { }

    public static create(prisma: PrismaClient) {
        return new SessionRepositoryPrisma(prisma);
    }

    public async save(userId: number): Promise<ISession> {
        return await this.prisma.sessions.create({ data: { userId } });
    }

    public async getById(id: string): Promise<ISession> {
        const session = await this.prisma.sessions.findUnique({ where: { id } });
        if(!session) return {} as ISession;
        
        return session;
    }

    public async remove(id: string): Promise<void> {
        await this.prisma.sessions.delete({ where: { id } });
    }
}