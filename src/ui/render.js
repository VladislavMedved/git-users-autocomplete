import { state } from "../state.js";
import { onSelect } from "../events/onSelect.js";
import { updateAriaAttributes } from "./aria.js";
import { renderListItem, renderCard, createSpinner } from "./components/index.js";
import { MESSAGES, CSS_CLASSES, ID_TEMPLATES } from "../constants.js";

export function updateUI() {
    const list = document.getElementById("results-list");
    const status = document.getElementById("status-message");
    const card = document.getElementById("selected-user");

    // Loading/Error
    status.classList.toggle(CSS_CLASSES.HIDDEN, !state.loading && !state.error);

    if (state.loading) {
        status.innerHTML = "";
        status.appendChild(createSpinner());
        status.appendChild(document.createTextNode(` ${MESSAGES.LOADING}`));
    } else {
        status.textContent = state.error ||
            (state.users.length === 0 && state.query.length > 1 ? MESSAGES.NO_MATCHES_FOUND : "");
    }

    // Update list with fade-in animation
    list.innerHTML = "";
    list.classList.toggle(CSS_CLASSES.HIDDEN, state.users.length === 0 || state.error);

    if (state.users.length > 0) {
        state.users.forEach((user, i) => {
            const li = renderListItem(user, i, state.highlightedIndex);
            list.appendChild(li);
        });

        // Add fade-in animation
        list.classList.add(CSS_CLASSES.FADE_IN);
    }

    // Update ARIA attributes
    updateAriaAttributes();

    // Card
    if (state.selectedUser) {
        card.classList.remove(CSS_CLASSES.HIDDEN);
        card.innerHTML = renderCard(state.selectedUser);
    } else {
        card.classList.add(CSS_CLASSES.HIDDEN);
    }
}
