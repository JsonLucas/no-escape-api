import Joi from "joi";
import { IGenericObject } from "../interfaces/GenericObject";

interface IValidator<S, O>{
	validate(schema: S, payload: IGenericObject, options: O): Promise<boolean>
}

export class Validator implements IValidator<Joi.ObjectSchema, Joi.AsyncValidationOptions> {
	public async validate(schema: Joi.ObjectSchema, payload: IGenericObject, options?: Joi.AsyncValidationOptions): Promise<boolean>{
		try {
			await schema.validateAsync(payload, options);
			return true;
		} catch(e: any) {
			console.log(e);
		}
		return false;
	}

    public static create() {
        return new Validator();
    }
}