export interface ISession {
    id: string,
    userId: number
}

export type CreateSessionInputDTO = Pick<ISession, 'userId'>;
export type CreateSessionOutputDTO = Pick<ISession, 'id'>;

export type SessionExistsInputDTO = Pick<ISession, 'id'>;
export type SessionExistsOutputDTO = Pick<ISession, 'userId'>;

export interface ISessionGateway {
    save: (userId: number) => Promise<ISession>,
    getById: (id: string) => Promise<ISession>,
    remove: (id: string) => Promise<void>
}

