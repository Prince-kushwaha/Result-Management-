export function errorMiddleware (err,req,resp,next) {
    let errMsg=err.message ||"internal error occurred";
    let errCode=err.statusCode||500;
    resp.status(errCode).send(errMsg);
}



