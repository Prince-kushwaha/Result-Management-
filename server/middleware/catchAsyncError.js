export let catchAsyncError = (theFunc) => (req, resp, next) => {
    Promise.resolve(theFunc(req, resp, next)).catch(next);
};