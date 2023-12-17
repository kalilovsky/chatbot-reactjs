export default async function fetchData(
  URL,
  data = null,
  method = "POST",
  dataType = "json",
) {
  const dataToSend =
    data === null ? null : dataType === "json" ? JSON.stringify(data) : data;
  let contentType;

  switch (dataType) {
    case "JSON":
    case "json":
      contentType = "application/json;charset=UTF-8";
      break;
    case "blob":
      contentType = "application/octet-stream";
      break;
    case "formdata":
    case "formData":
      break;
    case "text":
    default:
      contentType = "text/plain;charset=UTF-8";
  }

  let options = {
    method: data === null && method === "POST" ? "GET" : method,
    body: dataToSend,
    headers: {},
  };

  if (dataType !== "formData" && dataType !== "formdata") {
    options = {
      ...options,
      headers: {
        "Content-Type": contentType,
      },
    };
  }

  const request = await fetch(URL, options);
  //TODO: handle non json response (blob, html, etc...)
  const response = await request.json();
  if (request.ok) {
    return response;
  }
  if (request.status === 401) {
    window.location.reload();
  } else if (request.status >= 400 && request.status < 600) {
    return Promise.reject({
      ...response,
      errorCode: request.status,
    });
  }
  return "Erreur";
}
