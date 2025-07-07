import { state } from "../state.js";
import { onSelect } from "../events/onSelect.js";
import { updateAriaAttributes } from "./aria.js";

export function updateUI() {
    const list = document.getElementById("results-list");
    const status = document.getElementById("status-message");
    const card = document.getElementById("selected-user");

    // Loading/Error
    status.classList.toggle("hidden", !state.loading && !state.error);
    status.textContent = state.loading
        ? "Loading..."
        : state.error ||
          (state.users.length === 0 && state.query.length > 1 ? "No users found." : "");

    // Update list
    list.innerHTML = "";
    list.classList.toggle("hidden", state.users.length === 0 || state.error);

    state.users.forEach((user, i) => {
        const li = document.createElement("li");
        li.id = `option-${i}`;
        li.setAttribute("role", "option");
        li.setAttribute("aria-selected", state.highlightedIndex === i ? "true" : "false");
        li.textContent = user.login;
        li.addEventListener("click", () => onSelect(user));
        list.appendChild(li);
    });

    // Update ARIA attributes
    updateAriaAttributes();

    // Card
    if (state.selectedUser) {
        const { avatar_url, login, html_url } = state.selectedUser;
        card.classList.remove("hidden");
        card.innerHTML = `
			<img src="${avatar_url}" alt="${login}'s avatar">
			<div class="autocomplete__card-content">
				<strong>${login}</strong>
				<a href="${html_url}" target="_blank" rel="noopener noreferrer">
				GitHub Profile
				</a>
			</div>
		`;
    } else {
        card.classList.add("hidden");
    }
}
