import { TNumber, TObject, TOptional, TString } from '@sinclair/typebox';
import { t } from 'elysia';

export enum Context {
    BODY = 'body',
    PARAMS = 'params',
}

type SimpleIdParam = TObject<{ id: TNumber }>;

type UpdateUserParamOrBody<T extends Context.BODY | Context.PARAMS> = T extends Context.PARAMS
    ? SimpleIdParam
    : TObject<{ name: TOptional<TString>; age: TOptional<TNumber>; phone: TOptional<TString> }>;

export abstract class UserValidation {
    static createUser() {
        return t.Object({
            name: t.String(),
            age: t.Number({ minimum: 0 }),
            phone: t.Optional(t.Union([t.String(), t.Null()])),
            email: t.String({ format: 'email', default: 'example@email.com' }),
            password: t.String(),
        });
    }

    static simpleIdParam(): SimpleIdParam {
        return t.Object({ id: t.Number({ minimum: 0 }) });
    }

    static updateUser<T extends Context.BODY | Context.PARAMS>(type: T): UpdateUserParamOrBody<T> {
        return type === Context.PARAMS
            ? (t.Object({ id: t.Number({ minimum: 0 }) }) as UpdateUserParamOrBody<T>)
            : (t.Object({
                  name: t.Optional(t.String()),
                  age: t.Optional(t.Number({ minimum: 0 })),
                  phone: t.Optional(t.String()),
              }) as UpdateUserParamOrBody<T>);
    }

    static userLogin() {
        return t.Object({ email: t.String({ format: 'email', default: 'example@email.com' }), password: t.String() });
    }
}
