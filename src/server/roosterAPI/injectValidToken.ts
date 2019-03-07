import { getTokenFromApi } from './getTokenFromApi';

type MethodDecorator = (target: Object, propertyKey: string | number | symbol, descriptor: TypedPropertyDescriptor<(...args: any[]) => Promise<any>>)
  => TypedPropertyDescriptor<(...args: any[]) => Promise<any>>;

let lastToken: string;

export const injectValidToken: MethodDecorator = (_target, _propertyKey, descriptor) => {
  return {
    async value(...args: any[]): Promise<any> {
      let retryCount = 0;
      while (true) {
        try {
          const token = lastToken = lastToken || await getTokenFromApi();
          return await descriptor.value.call(this, ...args, token);
        } catch (error) {
          retryCount++;
          if (retryCount > 1) {
            throw error;
          } else {
            clearToken();
          }
        }
      }
    },
    enumerable: true,
    configurable: true,
  };
};

export function clearToken(): void {
  lastToken = undefined;
}
