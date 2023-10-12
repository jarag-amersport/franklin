export async function setupApiMock(url, handler) {
    if (
        process.env.NODE_ENV !== "production" &&
        window.localStorage.getItem("use-mocks")
    ) {
        const { rest, setupWorker } = await import("msw");
        return setupWorker(rest.get(url, handler)).start();
    }
}
