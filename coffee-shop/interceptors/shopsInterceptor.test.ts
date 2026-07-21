import { apiFetch } from './shopsInterceptor';
import { API_BASE_URL } from '@/config/apiConfig';

global.fetch = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

function mockFetchResponses(...responses: any[]) {
  responses.forEach((res) => {
    (global.fetch as jest.Mock).mockResolvedValueOnce(res);
  });
}

function createMockResponse(status: number, body: any = null) {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  };
}

describe('shopsInterceptor', () => {
  describe('token management', () => {
    it('should fetch a token and attach it to the request', async () => {
      mockFetchResponses(
        createMockResponse(200, { token: 'test-token-123' }),
        createMockResponse(200, { data: 'shops' })
      );

      const result = await apiFetch(`${API_BASE_URL}/shops`);

      expect(result?.status).toBe(200);
      expect(global.fetch).toHaveBeenCalledTimes(2);
      expect((global.fetch as jest.Mock).mock.calls[0][0]).toBe(`${API_BASE_URL}/tokens`);
      expect((global.fetch as jest.Mock).mock.calls[1][0]).toContain('token=test-token-123');
    });

    it('should throw an error if token fetching fails', async () => {
      mockFetchResponses(
        createMockResponse(500),
        createMockResponse(500),
        createMockResponse(500),
        createMockResponse(500)
      );

      await expect(apiFetch(`${API_BASE_URL}/shops`)).rejects.toThrow('We could not retrieve the token.');
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
      mockFetchResponses(
        createMockResponse(200, { token: 'token-123' }),
        createMockResponse(500),
        createMockResponse(200, { data: 'recovered' })
      );

      const promise = apiFetch(`${API_BASE_URL}/shops`);

      await jest.advanceTimersByTimeAsync(5000);

      const result = await promise;
      expect(result?.status).toBe(200);
      expect(global.fetch).toHaveBeenCalledTimes(3);
    });

    it('should not retry on 4xx client errors', async () => {
      mockFetchResponses(
        createMockResponse(200, { token: 'token-123' }),
        createMockResponse(400)
      );

      const result = await apiFetch(`${API_BASE_URL}/shops`);

      expect(result?.status).toBe(400);
      expect(global.fetch).toHaveBeenCalledTimes(2);
    });

    it('should throw network errors after max retries', async () => {
      (global.fetch as jest.Mock)
        .mockResolvedValueOnce(createMockResponse(200, { token: 'token-123' }))
        .mockRejectedValue(new Error('Network failure'));

      let caughtError: Error | undefined;
      const promise = apiFetch(`${API_BASE_URL}/shops`).catch(e => { caughtError = e; });

      await jest.runAllTimersAsync();

      await promise;

      expect(caughtError).toBeDefined();
      expect(caughtError?.message).toBe('Network failure');
      expect(global.fetch).toHaveBeenCalledTimes(5);
    });
  });
});
