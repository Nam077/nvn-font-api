/* eslint-disable @typescript-eslint/naming-convention */

declare const __brand: unique symbol;
type Brand<B> = { [__brand]: B };
export type Branded<T, B> = T & Brand<B>;
export type Constructor<T = any, Arguments extends unknown[] = any[]> = new (...arguments_: Arguments) => T;
export type ConstructorCustom<T = any> = new (...args: any[]) => T;

export type WrapperType<T> = T;
