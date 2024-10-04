async function getRecentPosts() {
    const response  = await axios.get("https://jsonplaceholder.typicode.com/posts");
    const data = response.data;
    console.log(data);
    for(let i = 0 ; i < data.length ; i++) {
        document.querySelector('#posts').innerHTML += `
            <div style="border: 1px solid black; padding: 10px; margin: 20px;">
                <h3>Post ${data[i].id}</h3>
                <h3>Title: ${data[i].title}</h3>
                <p>Body: ${data[i].body}</p>
            </div>
        `;
    }
}
