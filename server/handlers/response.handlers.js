const responseWithData = (res, statusCode, data) =>
  res.status(statusCode).json(data);

export const error = (res) =>
  responseWithData(res, 500, {
    status: 500,
    message: "Oops! Something worng!",
  });

export const badrequest = (res, message) =>
  responseWithData(res, 400, {
    status: 400,
    message,
  });

export const ok = (res, data) => responseWithData(res, 200, data);

export const created = (res, data) => responseWithData(res, 201, data);

export const notfound = (res) =>
  responseWithData(res, 404, {
    status: 404,
    message: "Resource not found",
  });
