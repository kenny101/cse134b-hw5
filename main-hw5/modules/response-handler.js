const responseHandler = {
    outputDoc: document.getElementById("response-output"),
    tableDoc: document.getElementById("response-table"),
    defaultTableHTML: `<tbody><tr><th>Headers</th><th>Origin</th><th>URL</th><th>Body</th></tr></tbody>`,
    parseToTable(response) {
      this.tableDoc.innerHTML = this.defaultTableHTML;
      this.outputDoc.textContent = JSON.stringify(response);
      const { headers, origin, url, json } = response;
      // Remove "</tbody>" from table to concatenate innerHTML
      var newHTML = this.tableDoc.innerHTML.slice(0, -8);
  
      // Add headers, origin, url, body row and concatenate ending "</tbody>" tag
      var responseHTML = `<td><table class="header-table"><tr><th>Key:</th><th>Value:</th></tr>`;
      for (let [key, value] of Object.entries(headers)) {
        responseHTML += `<tr><td>${key}</td><td>${value}</td></tr>`;
      }
      responseHTML += "</table></td>";
      responseHTML += `<td class="non-table-td">${origin}</td>`;
      responseHTML += `<td class="non-table-td">${url}</td>`;
  
      if (json === undefined) {
        responseHTML += `<td class="non-table-td">Not Avaliable for GET Request</td>`;
      } else {
        responseHTML += `<td class="body-td"><table class="body-table"><tr><th>Key:</th><th>Value:</th></tr>`;
        for (let [key, value] of Object.entries(json)) {
          responseHTML += `<tr><td>${key}</td><td>${value}</td></tr>`;
        }
        responseHTML += "</table></td>";
      }
      newHTML += responseHTML;
      newHTML += "</tbody>";
      this.tableDoc.innerHTML = newHTML;
    },
    makeRequest(url, method) {
      const formData = formHander.getFormData();
      if (formData.js_method === "Fetch") {
        delete formData.js_method;
        const fetchedPromise = fetchRequest(url, formData, method);
        fetchedPromise
          .then((response) => response.json())
          .then((response) => {
            responseHandler.parseToTable(response);
          })
          .catch((error) => console.error("Error:", error));
      } else {
        var requestData = {};
        if (method !== "GET") {
          delete formData.js_method;
          requestData = formData;
        }
        xmlRequest(url, requestData, method)
          .then((response) => {
            responseHandler.parseToTable(JSON.parse(response));
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  };


  const formHander = {
    doc: document.getElementById("article-form"),
    getFormData() {
      const formData = new FormData(this.doc);
      return {
        id: formData.get("article_id"),
        article_name: formData.get("article_name"),
        article_body: formData.get("article_body"),
        date: new Date(),
        js_method: formData.get("js_method"),
      };
    },
  };

  function fetchRequest(url, data, verb) {
    var headerData = {
      method: verb,
      headers: { "Content-Type": "application/json" },
    };
    // Add body for non-GET requests
    if (verb !== "GET") {
      headerData.body = JSON.stringify(data);
    }
    return fetch(url, headerData);
  }
  
  const xmlRequest = (url, data = {}, verb) => {
    const promise = new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(verb, url);
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.response);
        } else {
          reject(xhr.statusText);
        }
      };
      if (verb !== "GET") {
        xhr.send(JSON.stringify(data));
      } else {
        xhr.send();
      }
    });
    return promise;
  };