const accessKey = "4FqQJyYsRqeoiE8k0OI944jRXYFvVkToTuVmGAt7akY";

const formEl = document.querySelector("form");
const inputEl = document.getElementById("input_text");
const showImages = document.querySelector(".images");
const showMoreBtn = document.getElementById("btn-center");

let inputData = "";
let page = 1;

async function searchImages(){
    inputData = inputEl.value;
    const url = `http://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    const response = await fetch(url)
    const data = await response.json()
    const results = data.results;

    if(page === 1){
        showImages.innerHTML="";
    }
    results.map((result)=>{
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add("img1");

        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;

        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target="_blank"
// imageLink.textContent=result.alt_description;


imageLink.appendChild(image);
imageWrapper.appendChild(imageLink);
showImages.appendChild(imageWrapper);
    });

    page++ ;
    if(page>1){
        showMoreBtn.style.display="block";

    }
}

formEl.addEventListener("submit",(event)=>{
    event.preventDefault();
    page=1;
    searchImages();
}); 

showMoreBtn.addEventListener("click",()=>{
    searchImages();
});