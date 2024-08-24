import { API_URL } from "../utils/constants";
export const postRequest = async ({
  details,
  apiUrl,
  setError,
  setIsError,
  token,
  type,
}) => {
  try {
    const options1 = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
    };
    const options2 = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: details,
    };
    const options3 = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(details),
    };
    const options =
      apiUrl === "posts/upload-image"
        ? options2
        : apiUrl === "posts"
        ? options3
        : options1;
    const response = await fetch(API_URL + apiUrl, options);
    const data = await response.json();
    if (response.ok) {
      setIsError(false);
    } else {
      setIsError(true);
      setError(data?.message);
    }
    return data;
  } catch (error) {
    setIsError(true);
    setError(error.message);
  }
};

export const getRequest = async ({ apiUrl, setError, setIsError }) => {
  try {
    const response = await fetch(API_URL + apiUrl);
    const data = await response.json();
    if (response.ok) {
      setIsError(false);
    } else {
      setIsError(true);
      setError(data?.message);
    }
    return data;
  } catch (error) {
    setIsError(true);
    setError(error.message);
  }
};

export const deleteRequest = async ({
  apiUrl,
  setError,
  setIsError,
  token,
  details,
}) => {
  try {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(details),
    };
    const response = await fetch(API_URL + apiUrl, options);
    const data = await response.json();
    if (response.ok) {
      setIsError(false);
    } else {
      setIsError(true);
      setError(data?.message);
    }
    return data;
  } catch (error) {
    setIsError(true);
    setError(error.message);
  }
};

export const updateRequest = async ({
  apiUrl,
  setError,
  setIsError,
  token,
  details,
}) => {
  try {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(details),
    };
    const response = await fetch(API_URL + apiUrl, options);
    const data = await response.json();
    if (response.ok) {
      setIsError(false);
    } else {
      setIsError(true);
      setError(data?.message);
    }
    return data;
  } catch (error) {
    setIsError(true);
    setError(error.message);
  }
};
