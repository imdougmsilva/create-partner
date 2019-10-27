const responseHandler = (res, status, data, message) => res.status(status).send({
  message,
  ...data,
});

const httpJsonResponseHandler = ({
  responseEntity,
  httpStatusCode,
  httpResponseBody,
}) => responseEntity.status(httpStatusCode).send(httpResponseBody);

const httpJsonResponseBodyPattern = ({ data = null, error = false }) => ({
  data,
  error,
});

const httpJsonResponseHandlerSuccess = ({
  responseEntity,
  httpStatusCode = 200,
  httpResponseBody = '',
}) => httpJsonResponseHandler({
  responseEntity,
  httpStatusCode,
  httpResponseBody: httpJsonResponseBodyPattern({
    data: httpResponseBody,
  }),
});

const httpJsonResponseHandlerError = ({
  responseEntity,
  httpStatusCode = 500,
  errorCode = 'ERROR',
  errorMessage = 'Unexpected error',
}) => httpJsonResponseHandler({
  responseEntity,
  httpStatusCode,
  httpResponseBody: httpJsonResponseBodyPattern({
    error: {
      code: errorCode,
      message: errorMessage,
    },
  }),
});

export {
  httpJsonResponseHandler,
  httpJsonResponseHandlerError,
  httpJsonResponseHandlerSuccess,
  responseHandler,
};
