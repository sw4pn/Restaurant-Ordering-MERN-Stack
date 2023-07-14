export const getBearerToken = (req) => {
  const bearerHeader = req.headers["authorization"];

  if (bearerHeader && typeof bearerHeader !== undefined) {
    const bearer = bearerHeader.split(" ");

    return bearer[1];
  }

  return null;
};
