// --------------------------------------------------------------------------------------------------------
// 1. fetch - HTTP Client - by default it sends a GET request
// async await is just syncatactic suger for .then syntax

/**
 * fetch API syntax ----->
 * 
 * fetch("https://jsonplaceholder.typicode.com/posts/1", {
 *     method: "POST", // by default it is GET
 *      headers: {
 *         'Content-Type': 'application/json'
 *          'cookie': 'cookie1=value1; cookie2=value2;'
 *      }
 * });
 */

// Using async await (async await is syntactic sugar for .then syntax)
async function getRecentPost() {
    console.log("before sending request");
    // fetch - can return any type of data - JSON, text, blob, arrayBuffer, formData, stream, HTMLDocument
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/1"); // (browser provided functions - fetch, like setTimeout, or alert) this is background request(that happens after the initial request), returns promise
    const data = await response.json(); // I need to convert the response to JSON format; I we get text data from the server then we use response.text() it will return the text of the response
    console.log(data);
    console.log("request has been processed");

    //  templating engines like ejs, handlebars, etc. are not supported by fetch API
    
    // Doing dom manipulation
    document.querySelector('#posts').innerHTML = `
        <div style="border: 1px solid black; padding: 10px; margin: 20px;">
            <h3>Post ${response.data.id}</h3>
            <h3>Title: ${response.data.title}</h3>
            <p>Body: ${response.data.body}</p>
        </div>
    `;
}

getRecentPost();

// Using Promises Syntax
async function getRecentPost_01() {
    // async await code is also getting coverted in this format(.then promise based code) only behind the scenes
    const response = fetch("https://jsonplaceholder.typicode.com/posts/1").then(function(data) {
        response.json().then(function(data) {
            // this console.log will get logged after the request is processed and after - "console.log("request has been processed");"
            console.log(data);

            document.querySelector('#posts').innerHTML = `
                <div style="border: 1px solid black; padding: 10px; margin: 20px;">
                    <h3>Post ${response.data.id}</h3>
                    <h3>Title: ${response.data.title}</h3>
                    <p>Body: ${response.data.body}</p>
                </div>
            `;
        });
    });

    // This console.log will get logged before the request is processed
    console.log("request has been processed");
}
// getRecentPost_01();