// axios is a promise based HTTP client
const axios = {
    get: function(url) {
      return new Promise(function(resolve, reject) {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.onload = function() {
          if (this.status === 200) {
            resolve(JSON.parse(this.response));
          } else {
            reject({
              status: this.status,
              statusText: xhr.statusText
            });
          }
        };
        xhr.onerror = function() {
          reject({
            status: this.status,
            statusText: xhr.statusText
          });
        };
        xhr.send();
      });
    }, 
    post: function(url, data) {
      return new Promise(function(resolve, reject) {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", url);
        xhr.onload = function() {
          if (this.status === 200) {
            resolve(JSON.parse(this.response));
          } else {
            reject({
              status: this.status,
              statusText: xhr.statusText
            });
          }
        };
        xhr.onerror = function() {
          reject({
            status: this.status,
            statusText: xhr.statusText
          });
        };
        xhr.send(data);
      });
    },
    put: function(url, data) {
      return new Promise(function(resolve, reject) {
        const xhr = new XMLHttpRequest();
        xhr.open("PUT", url);
        xhr.onload = function() {
          if (this.status === 200) {
            resolve(JSON.parse(this.response));
          } else {
            reject({
              status: this.status,
              statusText: xhr.statusText
            });
          }
        };
        xhr.onerror = function() {
          reject({
            status: this.status,
            statusText: xhr.statusText
          });
        };
        xhr.send(data);
      });
    },
    delete: function(url) {
      return new Promise(function(resolve, reject) {
        const xhr = new XMLHttpRequest();
        xhr.open("DELETE", url);
        xhr.onload = function() {
          if (this.status === 200) {
            resolve(JSON.parse(this.response));
          } else {
            reject({
              status: this.status,
              statusText: xhr.statusText
            });
          }
        };
        xhr.onerror = function() {
          reject({
            status: this.status,
            statusText: xhr.statusText
          });
        };
        xhr.send();
      });
    }
  }
  
  const x = axios.get("https://jsonplaceholder.typicode.com/posts/1");