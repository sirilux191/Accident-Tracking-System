export const handleResult = (result) => {
  if ("ok" in result) {
    return { ok: result.ok };
  } else if ("err" in result) {
    return { error: result.err };
  }
  return { error: "Unknown error occurred" };
};

export const handleError = (message, error) => {
  console.error(message, error);
  return { error: message };
};
