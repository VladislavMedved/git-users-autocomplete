import { renderListItem, renderCard, createSpinner } from '../../src/ui/components/index.js';
import { ID_TEMPLATES, ARIA_KEYS, CSS_CLASSES, MESSAGES } from '../../src/constants.js';
import { jest } from '@jest/globals';

beforeAll(() => {
    window.scrollIntoView = window.scrollIntoView || jest.fn();
    global.AbortController = global.AbortController || class AbortController {
        constructor() { this.signal = {}; }
        abort() { }
    };
});

describe('UI Components', () => {
    describe('renderListItem', () => {
        test('should create list item with correct attributes', () => {
            const user = { login: 'testuser' };
            const index = 0;
            const highlightedIndex = 0;

            const li = renderListItem(user, index, highlightedIndex);

            expect(li.tagName).toBe('LI');
            expect(li.id).toBe(ID_TEMPLATES.OPTION(index));
            expect(li.getAttribute(ARIA_KEYS.ROLE)).toBe('option');
            expect(li.getAttribute(ARIA_KEYS.SELECTED)).toBe('true');
            expect(li.textContent).toBe('testuser');
            expect(li.classList.contains(CSS_CLASSES.HIGHLIGHTED)).toBe(true);
        });

        test('should not highlight when not selected', () => {
            const user = { login: 'testuser' };
            const index = 0;
            const highlightedIndex = 1;

            const li = renderListItem(user, index, highlightedIndex);

            expect(li.getAttribute(ARIA_KEYS.SELECTED)).toBe('false');
            expect(li.classList.contains(CSS_CLASSES.HIGHLIGHTED)).toBe(false);
        });
    });

    describe('renderCard', () => {
        test('should render user card with correct content', () => {
            const user = {
                login: 'testuser',
                avatar_url: 'https://example.com/avatar.jpg',
                html_url: 'https://github.com/testuser'
            };

            const cardHTML = renderCard(user);

            expect(cardHTML).toContain('testuser');
            expect(cardHTML).toContain('https://example.com/avatar.jpg');
            expect(cardHTML).toContain('https://github.com/testuser');
            expect(cardHTML).toContain(MESSAGES.GITHUB_PROFILE);
            expect(cardHTML).toContain('autocomplete__avatar');
            expect(cardHTML).toContain('autocomplete__link');
        });

        test('should return null for null user', () => {
            expect(renderCard(null)).toBeNull();
        });
    });

    describe('createSpinner', () => {
        test('should create spinner with correct structure', () => {
            const spinner = createSpinner();

            expect(spinner.tagName).toBe('DIV');
            expect(spinner.classList.contains(CSS_CLASSES.SPINNER)).toBe(true);
            expect(spinner.querySelector('.spinner__inner')).toBeTruthy();
        });
    });
});
