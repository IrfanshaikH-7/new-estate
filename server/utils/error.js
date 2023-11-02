export const errorHandler = (stateCode, message) => {
    const error = new Error();
    error.stateCode = stateCode;
    error.message = message;
    return error
}