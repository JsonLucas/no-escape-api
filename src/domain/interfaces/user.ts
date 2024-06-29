export interface IUser {
    id: number,
    name: string,
    email: string,
    phone: string,
    password: string,
    picture?: string | null
}

export type UserInputDTO = Omit<IUser, 'id' | 'picture'>;
export type UserOutputDTO = Pick<IUser, 'id'>;
export type LoginInputDTO = Pick<UserInputDTO, 'email'>;
export type GetUserProfileByIdInputDTO = Pick<IUser, 'id'>;
export type UpdateUserPictureInputDTO = Pick<IUser, 'id' | 'picture'>;