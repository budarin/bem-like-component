import Koa from 'koa';
import mock from 'node-mocks-http';
import { IKoaAppContext, IKoaAppState } from '../../src/server/types/app';

export interface MockContext<RequestBody = undefined> extends IKoaAppContext {
    request: IKoaAppContext['request'] & {
        body?: RequestBody;
    };
}

const NOT_FOUND = 404;

const koaMockContext = <State = IKoaAppState, Context = MockContext, ResponseBody = undefined>(
    responseBody?: ResponseBody,
): Koa.ParameterizedContext<IKoaAppState, IKoaAppContext> => {
    const req = mock.createRequest();
    const res = mock.createResponse();
    const app = new Koa<State, Context>();
    const context = app.createContext(req, res) as Koa.ParameterizedContext<IKoaAppState, IKoaAppContext>;

    res.statusCode = NOT_FOUND;
    context.response.body = responseBody;
    return context;
};

export default koaMockContext;
