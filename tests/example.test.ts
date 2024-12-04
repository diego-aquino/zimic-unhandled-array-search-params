import { afterAll, beforeAll, it } from 'vitest';

import { httpInterceptor } from 'zimic/interceptor/http';

const baseURL = 'https://localhost:3000';

const interceptor = httpInterceptor.create<{
  '/': {
    GET: {
      request: {
        searchParams: {
          one: string;
          many: string[];
        };
      };
      response: {
        200: {};
      };
    };
  };
}>({
  type: 'local',
  baseURL,
  onUnhandledRequest: { action: 'reject' },
});

beforeAll(async () => {
  await interceptor.start();
});

afterAll(async () => {
  await interceptor.stop();
});

it('should correctly log array search params of unhandled requests', async () => {
  try {
    await fetch(`${baseURL}?one=1&many=1&many=2`);
  } catch {}
});
