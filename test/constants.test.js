import { jest } from '@jest/globals';
import {
    ID_TEMPLATES,
    ARIA_KEYS,
    MESSAGES,
    CSS_CLASSES,
    ANIMATION
} from '../src/constants.js';

beforeAll(() => {
    window.scrollIntoView = window.scrollIntoView || jest.fn();
    global.AbortController = global.AbortController || class AbortController {
        constructor() { this.signal = {}; }
        abort() { }
    };
});

describe('Constants', () => {
    describe('ID_TEMPLATES', () => {
        test('should generate correct option IDs', () => {
            expect(ID_TEMPLATES.OPTION(0)).toBe('option-0');
            expect(ID_TEMPLATES.OPTION(5)).toBe('option-5');
            expect(ID_TEMPLATES.OPTION(10)).toBe('option-10');
        });
    });

    describe('ARIA_KEYS', () => {
        test('should contain all required ARIA attributes', () => {
            expect(ARIA_KEYS.EXPANDED).toBe('aria-expanded');
            expect(ARIA_KEYS.ACTIVE_DESCENDANT).toBe('aria-activedescendant');
            expect(ARIA_KEYS.SELECTED).toBe('aria-selected');
            expect(ARIA_KEYS.CONTROLS).toBe('aria-controls');
            expect(ARIA_KEYS.AUTOCOMPLETE).toBe('aria-autocomplete');
            expect(ARIA_KEYS.ROLE).toBe('role');
            expect(ARIA_KEYS.LABEL).toBe('aria-label');
            expect(ARIA_KEYS.LIVE).toBe('aria-live');
            expect(ARIA_KEYS.STATUS).toBe('role');
        });
    });

    describe('MESSAGES', () => {
        test('should contain all required messages', () => {
            expect(MESSAGES.LOADING).toBe('Loading...');
            expect(MESSAGES.NO_USERS_FOUND).toBe('No users found.');
            expect(MESSAGES.NO_MATCHES_FOUND).toBe('🧐 No matches found');
            expect(MESSAGES.SOMETHING_WENT_WRONG).toBe('Something went wrong.');
            expect(MESSAGES.GITHUB_PROFILE).toBe('GitHub Profile');
        });
    });

    describe('CSS_CLASSES', () => {
        test('should contain all required CSS classes', () => {
            expect(CSS_CLASSES.HIDDEN).toBe('hidden');
            expect(CSS_CLASSES.HIGHLIGHTED).toBe('highlighted');
            expect(CSS_CLASSES.FADE_IN).toBe('fade-in');
            expect(CSS_CLASSES.SPINNER).toBe('spinner');
            expect(CSS_CLASSES.NO_RESULTS).toBe('no-results');
        });
    });

    describe('ANIMATION', () => {
        test('should contain animation durations', () => {
            expect(typeof ANIMATION.FADE_IN_DURATION).toBe('number');
            expect(typeof ANIMATION.DEBOUNCE_DELAY).toBe('number');
            expect(ANIMATION.FADE_IN_DURATION).toBe(300);
            expect(ANIMATION.DEBOUNCE_DELAY).toBe(400);
        });
    });
});
