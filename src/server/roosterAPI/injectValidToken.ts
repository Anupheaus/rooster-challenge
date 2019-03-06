import { getTokenFromApi } from './getTokenFromApi';

type MethodDecorator = (target: Object, propertyKey: string | number | symbol, descriptor: TypedPropertyDescriptor<(...args: any[]) => Promise<any>>)
  => TypedPropertyDescriptor<(...args: any[]) => Promise<any>>;

let lastToken: string;

export const injectValidToken: MethodDecorator = (_target, _propertyKey, descriptor) => {
  return {
    async value(...args: any[]): Promise<any> {
      while (true) {
        try {
          const token = lastToken = lastToken || await getTokenFromApi();
          return descriptor.value.call(_target, ...args, token);
        } catch (error) {
          // tslint:disable-next-line: no-console
          console.error(error);
          break;
        }
      }
    },
    enumerable: true,
    configurable: true,
  };
};
