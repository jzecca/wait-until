module.exports = (fn, timeout = 5000, delay = 20) => new Promise((resolve, reject) => {
    let timeoutTimer;
    let retryTimer;

    const clearTimers = () => {
        clearTimeout(timeoutTimer);
        clearTimeout(retryTimer);
    };

    const doTry = async () => {
        try {
            const result = await fn();

            if (result) {
                clearTimers();
                return resolve(result);
            }

            retryTimer = setTimeout(doTry, delay);
        } catch (error) {
            clearTimers();
            reject(error);
        }
    };

    doTry();

    timeoutTimer = setTimeout(() => {
        clearTimers();
        reject(new Error(`Timed out after ${timeout}ms`));
    }, timeout);
});
