import { onSelect } from '../../src/events/onSelect.js';
import { state } from '../../src/state.js';
import { jest } from '@jest/globals';

beforeAll(() => {
    window.scrollIntoView = window.scrollIntoView || jest.fn();
    global.AbortController = global.AbortController || class AbortController {
        constructor() { this.signal = {}; }
        abort() { }
    };
});

describe('onSelect', () => {
    beforeEach(() => {
        // DOM setup for updateUI
        document.body.innerHTML = `
            <input id="search-input">
            <span id="status-message"></span>
            <ul id="results-list"></ul>
            <pre id="selected-user"></pre>
        `;
        // Reset state
        Object.assign(state, {
            query: 'test',
            users: [
                { login: 'user1', avatar_url: 'url1', html_url: 'html1' },
                { login: 'user2', avatar_url: 'url2', html_url: 'html2' }
            ],
            selectedUser: null,
            highlightedIndex: 1,
            loading: false,
            error: null,
            controller: null,
        });
    });

    afterEach(() => {
        document.body.innerHTML = '';
    });

    test('should update state when user is selected', () => {
        const user = { login: 'selecteduser', avatar_url: 'url3', html_url: 'html3' };

        onSelect(user);

        expect(state.selectedUser).toEqual(user);
        expect(state.users).toEqual([]);
        expect(state.highlightedIndex).toBe(-1);
    });

    test('should clear users list and reset highlight index', () => {
        const user = { login: 'testuser' };

        onSelect(user);

        expect(state.users).toEqual([]);
        expect(state.highlightedIndex).toBe(-1);
    });

    test('should handle selection with existing selected user', () => {
        const existingUser = { login: 'existing' };
        const newUser = { login: 'newuser' };

        state.selectedUser = existingUser;

        onSelect(newUser);

        expect(state.selectedUser).toEqual(newUser);
        expect(state.users).toEqual([]);
        expect(state.highlightedIndex).toBe(-1);
    });
});
