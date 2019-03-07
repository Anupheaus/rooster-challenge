import * as proxyquire from 'proxyquire';

const getTokenFromApi = chai.spy(async () => new Promise(resolve => setTimeout(() => resolve('test'), 10)));

const { injectValidToken, clearToken } = proxyquire('./injectValidToken', {
  './getTokenFromApi': {
    getTokenFromApi,
  },
});

class TestClass {
  constructor() {
    this._failCount = 0;
  }
  private _failCount: number;

  public async testMethod(): Promise<string>;
  @injectValidToken
  public async testMethod(token?: string): Promise<string> {
    return token;
  }

  public async testMethodWithParams(myFirstParam: string, mySecondParam: number);
  @injectValidToken
  public async testMethodWithParams(myFirstParam: string, mySecondParam: number, token?: string) {
    return {
      myFirstParam,
      mySecondParam,
      token,
    };
  }

  public async testFailOnceMethod();
  @injectValidToken
  public async testFailOnceMethod(token?: string) {
    this._failCount++;
    if (this._failCount === 2) { return token; }
    throw new Error('oops');
  }

}

beforeEach(() => {
  clearToken();
  getTokenFromApi['__spy'].calls = [];
  getTokenFromApi['__spy'].called = false;
});

it('calls the getTokenFromApi method only once with multiple calls', async () => {
  const testClass = new TestClass();

  expect(getTokenFromApi).not.to.have.been.called;
  let token = await testClass.testMethod();
  expect(getTokenFromApi).to.have.been.called.once;
  expect(token).to.eq('test');
  token = await testClass.testMethod();
  expect(getTokenFromApi).to.have.been.called.once;
});

it('works with methods with parameters', async () => {
  const testClass = new TestClass();

  expect(getTokenFromApi).not.to.have.been.called;
  const result = await testClass.testMethodWithParams('hey', 2);
  expect(getTokenFromApi).to.have.been.called.once;
  expect(result).to.eql({ myFirstParam: 'hey', mySecondParam: 2, token: 'test' });
});

it('re-tries on first error (assumes token is invalid)', async () => {
  const testClass = new TestClass();

  expect(getTokenFromApi).not.to.have.been.called;
  const token = await testClass.testFailOnceMethod();
  expect(getTokenFromApi).to.have.been.called.twice;
  expect(token).to.eq('test');
});
