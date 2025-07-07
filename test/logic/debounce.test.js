import { debounce } from '../../src/logic/debounce.js';
import { jest } from '@jest/globals';

beforeAll(() => {
    window.scrollIntoView = window.scrollIntoView || jest.fn();
    global.AbortController = global.AbortController || class AbortController {
        constructor() { this.signal = {}; }
        abort() { }
    };
});

describe('debounce', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test('should delay function execution', () => {
        const mockFn = jest.fn();
        const debouncedFn = debounce(mockFn, 100);

        debouncedFn();
        expect(mockFn).not.toHaveBeenCalled();

        jest.advanceTimersByTime(100);
        expect(mockFn).toHaveBeenCalledTimes(1);
    });

    test('should cancel previous calls when called again', () => {
        const mockFn = jest.fn();
        const debouncedFn = debounce(mockFn, 100);

        debouncedFn();
        jest.advanceTimersByTime(50);
        debouncedFn();
        jest.advanceTimersByTime(50);
        expect(mockFn).not.toHaveBeenCalled();

        jest.advanceTimersByTime(50);
        expect(mockFn).toHaveBeenCalledTimes(1);
    });

    test('should pass arguments to the debounced function', () => {
        const mockFn = jest.fn();
        const debouncedFn = debounce(mockFn, 100);

        debouncedFn('arg1', 'arg2');
        jest.advanceTimersByTime(100);

        // Only the first argument is passed in the app usage
        expect(mockFn).toHaveBeenCalledWith('arg1');
    });

    test('should work with different delay times', () => {
        const mockFn = jest.fn();
        const debouncedFn = debounce(mockFn, 200);

        debouncedFn();
        jest.advanceTimersByTime(100);
        expect(mockFn).not.toHaveBeenCalled();

        jest.advanceTimersByTime(100);
        expect(mockFn).toHaveBeenCalledTimes(1);
    });
});
