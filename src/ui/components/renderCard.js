import { MESSAGES } from "../../constants.js";

export function renderCard(user) {
    if (!user) return null;

    const { avatar_url, login, html_url } = user;

    return `
        <img src="${avatar_url}" alt="${login}'s avatar" class="autocomplete__avatar">
        <div class="autocomplete__card-content">
            <strong>${login}</strong>
            <a href="${html_url}" target="_blank" rel="noopener noreferrer" class="autocomplete__link">
                ${MESSAGES.GITHUB_PROFILE}
            </a>
        </div>
    `;
}
