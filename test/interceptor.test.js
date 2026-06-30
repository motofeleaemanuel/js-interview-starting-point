global.fetch = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  jest.resetModules();
});

function mockFetchResponses(...responses) {
  responses.forEach(res => {
    global.fetch.mockResolvedValueOnce(res);
  });
}

function createMockResponse(status, body = null) {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  };
}

describe('interceptor', () => {
  describe('token management', () => {
    it('should fetch a token and attach it to the request', async () => {
      const { apiFetch } = await import('../src/interceptor');

      mockFetchResponses(
        createMockResponse(200, { token: 'test-token-123' }),
        createMockResponse(200, { data: 'shops' }),
      );

      const result = await apiFetch('https://api.test.com/shops');

      expect(result.status).toBe(200);
      expect(global.fetch.mock.calls[1][0]).toContain('token=test-token-123');
    });
  });

  describe('retry with exponential backoff', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should retry on 500 errors and succeed when the server recovers', async () => {
      const { apiFetch } = await import('../src/interceptor');

      mockFetchResponses(
        createMockResponse(200, { token: 'token-123' }),
        createMockResponse(500),
        createMockResponse(200, { data: 'recovered' }),
      );

      const promise = apiFetch('https://api.test.com/shops');

      await jest.advanceTimersByTimeAsync(5000);

      const result = await promise;
      expect(result.status).toBe(200);
    });

    it('should not retry on 4xx client errors', async () => {
      const { apiFetch } = await import('../src/interceptor');

      mockFetchResponses(
        createMockResponse(200, { token: 'token-123' }),
        createMockResponse(400),
      );

      const result = await apiFetch('https://api.test.com/shops');

      expect(result.status).toBe(400);
      expect(global.fetch).toHaveBeenCalledTimes(2);
    });
  });
});
