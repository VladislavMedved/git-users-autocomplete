export function debounce(callback, delay = 500) {
    let timer;

    return function (payload) {
        clearTimeout(timer);

        timer = setTimeout(() => {
            callback(payload);
        }, delay);
    };
}
