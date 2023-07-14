const storage = localStorage.getItem("accessToken");

const token =
  storage ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YWZmMGJkNjIyZDdhNDMwMGNiZGE2MSIsImlhdCI6MTY4OTMyNDkxMSwiZXhwIjoxNjkxOTE2OTExfQ.Qm2IXniGix84Lb4ErH3GjyZUEpmcO6lC8jQJHRNNaYY";

export const axiosConfig = {
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
};
