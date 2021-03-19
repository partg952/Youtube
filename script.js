let button = document.createElement("input")
let search_div = document.getElementById("search")
let search = document.createElement("input")
let main_container = document.getElementById("main-container")
let video2 = ''
search.type = "text"
search_div.appendChild(search)
search_div.appendChild(button)
button.value = "Search"
button.type = "button"

search.classList.add("search")

search.addEventListener("change", () => {
    fetchVideo()
})

button.addEventListener("click", () => {
    fetchVideo()
})

button.value = "Search"
button.type = "button"

function fetchVideo() {
    while (main_container.firstChild) {
        main_container.removeChild(main_container.firstChild)
    }
    fetch("https://www.googleapis.com/youtube/v3/search?part=snippet&key=[YOUR API KEY]&maxResults=50&type=video&q=" + search.value).then((response) => {


        return response.json();

    }).then((blob) => {

        console.log(blob)
        for (let i = 0; i < blob.items.length; i++) {
            let div = document.createElement("div")
            main_container.appendChild(div)
            let description = document.createElement("p")
            let title = document.createElement("p")
            let video = document.createElement("iframe")
            div.classList.add("class")
	    video.style.width =  "700px"
	    video.style.height = "700px"	            
            div.appendChild(video)
            div.appendChild(title)
            div.appendChild(description)
            title.innerHTML = "Title: " + blob.items[i].snippet.title
            description.innerHTML = "Description: " + blob.items[i].snippet.description
            video.controls = "true"
            video.loading = 'eager'
            video.src = "https://www.youtube.com/embed/" + blob.items[i].id.videoId
            video.allowFullscreen = "true"
            video.style.height = "500px"
            video.style.width = "500px"
            video2 = video
            video.style.margin = "20px"
            console.log(blob.items[i].snippet.title)

        }



    }).catch(() => {
        alert("unable to fetch!")
    })

}
