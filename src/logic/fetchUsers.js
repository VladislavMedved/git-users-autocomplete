import { state } from "../state.js";
import { updateUI } from "../ui/render.js";

export async function fetchUsers(query) {
    if (state.controller) state.controller.abort();
    state.controller = new AbortController();

    const signal = state.controller.signal;

    try {
        state.loading = true;
        updateUI();

        const response = await fetch(`https://api.github.com/search/users?q=${query}`, { signal });

        if (!response.ok) throw new Error("Request failed");

        const json = await response.json();
        state.users = json.items || [];
        state.error = null;
    } catch (err) {
        if (err.name !== "AbortError") {
            state.error = "Something went wrong.";
            state.users = [];
        }
    } finally {
        state.loading = false;
        updateUI();
    }
}
