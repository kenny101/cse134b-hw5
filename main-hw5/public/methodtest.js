import responseHandler from "../modules/response-handler.js/"

const postHandler = {
  doc: document.getElementById("post-btn"),
  handleClick() {
    this.doc.addEventListener("click", (e) => {
      e.preventDefault();
      responseHandler.makeRequest("https://httpbin.org/post", "POST");
    });
  },
};

const getHandler = {
  doc: document.getElementById("get-btn"),
  handleClick() {
    this.doc.addEventListener("click", (e) => {
      e.preventDefault();
      responseHandler.makeRequest("https://httpbin.org/get", "GET");
    });
  },
};

const putHandler = {
  doc: document.getElementById("put-btn"),
  handleClick() {
    this.doc.addEventListener("click", (e) => {
      e.preventDefault();
      responseHandler.makeRequest("https://httpbin.org/put", "PUT");
    });
  },
};
const deleteHandler = {
  doc: document.getElementById("delete-btn"),
  handleClick() {
    this.doc.addEventListener("click", (e) => {
      e.preventDefault();
      responseHandler.makeRequest("https://httpbin.org/delete", "delete");
    });
  },
};

postHandler.handleClick();
getHandler.handleClick();
putHandler.handleClick();
deleteHandler.handleClick();