export const BASE_URL = process.env.NODE_ENV === "production" ? "" : "localhost:3000";
export const HEADER_JSON = {"Content-Type": "application/json"};
export const HEADER_FORM_DATA = {"Content-Type": "application/x-www-form-urlencoded"};
export const HEADER_FILE = {"Content-Type": "multipart/form-data"};
export const HEADER_TEXT = {"Content-Type": "text/plain"};
export const FAKE_URL = "https://weneedfun.com/wp-content/uploads/2016/07/Girls-Black-and-White-Profile-Pictures-1.jpg";
export const VALID_EMAIL =
  "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$";
export const USERS_DATA_DIR = "./public/data";