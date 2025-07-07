import { state } from "../state.js";
import { updateUI } from "../ui/render.js";
import { MESSAGES } from "../constants.js";

// Cache for memoization
const cache = new Map();

export async function fetchUsers(query) {
    // Check cache first
    if (cache.has(query)) {
        const cachedData = cache.get(query);
        state.users = cachedData;
        state.error = null;
        state.loading = false;
        updateUI();
        return;
    }

    if (state.controller) state.controller.abort();
    state.controller = new AbortController();

    const signal = state.controller.signal;

    try {
        state.loading = true;
        updateUI();

        const response = await fetch(`https://api.github.com/search/users?q=${query}`, { signal });

        if (!response.ok) throw new Error("Request failed");

        const json = await response.json();
        const users = json.items || [];

        // Cache the result
        cache.set(query, users);

        state.users = users;
        state.error = null;
    } catch (err) {
        if (err.name !== "AbortError") {
            state.error = MESSAGES.SOMETHING_WENT_WRONG;
            state.users = [];
        }
    } finally {
        state.loading = false;
        updateUI();
    }
}

// Clear cache when needed (e.g., on app reset)
export function clearCache() {
    cache.clear();
}
