const fetchAbsolute = require("fetch-absolute");

let url;
if (process.env.NODE_ENV === "production") {
  url = "https://welfarepatrol.herokuapp.com";
} else {
  url = "http://localhost:5000";
}

const fetchApi = fetchAbsolute(fetch)(url);
export default fetchApi;