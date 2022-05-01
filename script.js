let searchButton = document.querySelector("#search")

//Add an event listener to the button that runs the function sendApiRequest when it is clicked
searchButton.addEventListener("click", ()=>{
    console.log("button pressed")
    sendApiRequest()
})

//An asynchronous function to fetch data from the API.
async function sendApiRequest(){
    let APP_ID = "98817906"
    let API_KEY = "5bdef1c2cd6643063f7313d060069af6"
    let response = await fetch('https://api.edamam.com/search?app_id=${APP_ID}&app_key=${API_KEY}&q=pizza');
    console.log(response)
}

//function that does something with the data recieved from the API.
function useApiData(data){

}