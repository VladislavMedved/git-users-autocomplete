import { fetchUsers, clearCache } from '../../src/logic/fetchUsers.js';
import { state } from '../../src/state.js';
import { jest } from '@jest/globals';

// Mock fetch globally
global.fetch = jest.fn();

beforeAll(() => {
    window.scrollIntoView = window.scrollIntoView || jest.fn();
    global.AbortController = global.AbortController || class AbortController {
        constructor() { this.signal = {}; }
        abort() { }
    };
});

describe('fetchUsers', () => {
    beforeEach(() => {
        // DOM setup for updateUI
        document.body.innerHTML = `
            <input id="search-input">
            <span id="status-message"></span>
            <ul id="results-list"></ul>
            <pre id="selected-user"></pre>
        `;
        // Reset state and mocks
        Object.assign(state, {
            query: '',
            users: [],
            selectedUser: null,
            highlightedIndex: -1,
            loading: false,
            error: null,
            controller: null,
        });
        fetch.mockClear();
        clearCache();
    });

    afterEach(() => {
        document.body.innerHTML = '';
    });

    test('should fetch users from API and update state', async () => {
        const mockUsers = [
            { login: 'user1', avatar_url: 'url1', html_url: 'html1' },
            { login: 'user2', avatar_url: 'url2', html_url: 'html2' }
        ];

        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ items: mockUsers })
        });

        await fetchUsers('test');

        expect(state.users).toEqual(mockUsers);
        expect(state.error).toBeNull();
        expect(state.loading).toBe(false);
        expect(fetch).toHaveBeenCalledWith(
            'https://api.github.com/search/users?q=test',
            expect.any(Object)
        );
    });

    test('should handle API errors', async () => {
        fetch.mockResolvedValueOnce({
            ok: false
        });

        await fetchUsers('test');

        expect(state.error).toBe('Something went wrong.');
        expect(state.users).toEqual([]);
        expect(state.loading).toBe(false);
    });

    test('should handle network errors', async () => {
        fetch.mockRejectedValueOnce(new Error('Network error'));

        await fetchUsers('test');

        expect(state.error).toBe('Something went wrong.');
        expect(state.users).toEqual([]);
        expect(state.loading).toBe(false);
    });

    test('should use cached results for repeated queries', async () => {
        const mockUsers = [{ login: 'user1' }];

        // First call - fetch from API
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ items: mockUsers })
        });

        await fetchUsers('test');
        expect(fetch).toHaveBeenCalledTimes(1);

        // Second call - should use cache
        await fetchUsers('test');
        expect(fetch).toHaveBeenCalledTimes(1); // Still only 1 call
        expect(state.users).toEqual(mockUsers);
    });

    test('should abort previous requests', async () => {
        const mockAbort = jest.fn();
        const mockController = { abort: mockAbort, signal: {} };

        // Mock AbortController
        global.AbortController = jest.fn(() => mockController);

        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ items: [] })
        });

        await fetchUsers('test1');
        await fetchUsers('test2');

        expect(mockAbort).toHaveBeenCalled();
    });

    test('should not set error for aborted requests', async () => {
        fetch.mockRejectedValueOnce({ name: 'AbortError' });

        await fetchUsers('test');

        expect(state.error).toBeNull();
    });

    test('should clear cache when clearCache is called', async () => {
        const mockUsers = [{ login: 'user1' }];

        // First call - cache the result
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ items: mockUsers })
        });

        await fetchUsers('test');
        expect(fetch).toHaveBeenCalledTimes(1);

        // Clear cache
        clearCache();

        // Second call - should fetch again
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ items: mockUsers })
        });

        await fetchUsers('test');
        expect(fetch).toHaveBeenCalledTimes(2);
    });
});
