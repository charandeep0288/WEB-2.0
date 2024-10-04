// --------------------------------------------------------------------------------------------------------
// 2. axios(External library) - Promise based 

async function getRecentPost_02() {
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts/1"); // this axios will automatically convert the response to JSON format
    console.log('response.data', response.data);
    
    document.querySelector('#posts').innerHTML = `
            <div style="border: 1px solid black; padding: 10px; margin: 20px;">
                <h3>Post ${response.data.id}</h3>
                <h3>Title: ${response.data.title}</h3>
                <p>Body: ${response.data.body}</p>
            </div>
    `;  

}

getRecentPost_02();