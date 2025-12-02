

// using .then catch 
function getSampleData() {
    fetch("https://jsonplaceholder.typicode.com/posts")


        .then(response => {
            console.log("☑️ Raw response data", response)
            return response.json()
        })
        .then(data => {
            console.log("FInal parsed data", data);
        })
        .catch(error => {
            console.error("Api failed", error)
        })
};


getSampleData()



// using async await
async function getSampleData() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts")

        console.log(response)


        const data = await response.json();

        console.log("FInal parsed data", data);

        return data
    } catch (error) {
        console.log(error)
    }
};


getSampleData()
