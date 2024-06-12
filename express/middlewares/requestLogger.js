export const requestLogger = (request, response, next) => {
    console.info(`Requête recue: [${request.method}] ${request.url}`);
    next();
};