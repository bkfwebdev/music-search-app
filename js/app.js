// get search string from user
// encode search string for get request
// issue get request with encoded string
// log result
// GET https://api.spotify.com/v1/search

var resultsDisplayed = false;

function addListElement (albumTitle,albumArtist,albumArt){
	 let newAlbum = document.createElement("li");
	 let newDiv = document.createElement("div");
	 let newImage = document.createElement("img");
	 let albumTitleSpan  = document.createElement("span");
	 let artistNameSpan = document.createElement("span");
	 let albumList = document.getElementById("albums");
	newDiv.setAttribute("class","album-wrap");
	newImage.setAttribute("class","album-art");
	newImage.setAttribute("src",albumArt);
	albumTitleSpan.setAttribute("class","album-title");
	albumTitleSpan.innerHTML = albumTitle;
	artistNameSpan.setAttribute("class","artist-name");
	artistNameSpan.innerHTML = albumArtist;
	newDiv.appendChild(newImage);
	newAlbum.appendChild(newDiv);
	newAlbum.appendChild(albumTitleSpan);
	newAlbum.appendChild(artistNameSpan);
	albumList.appendChild(newAlbum);
	$(".desc").hide();
} 

function processData(searchResponseObject){
if (resultsDisplayed === true){clearLastSearch();}
console.log(searchResponseObject);
var loopEnd = searchResponseObject.albums.items.length;
for (index = 0; index < loopEnd; index ++){
let currentAlbum = searchResponseObject.albums.items[index].name;
let currentArtist = searchResponseObject.albums.items[index].artists[0].name;
let currentImage = searchResponseObject.albums.items[index].images[0 ].url;
addListElement(currentAlbum,currentArtist,currentImage);
}
resultsDisplayed = true;
}

function submitSearch (userInput){
let queryString = "";
let urlTarget = "https://api.spotify.com/v1/search"
for (x=0; x< userInput.length; x++){
	if (userInput.substr(x,1) !== " "){
		queryString += userInput.substr(x,1);
	} else {  
		if (userInput.substr(x,1) == " "){
			queryString += "%20";
			}
	}
}
queryString = "q=" + queryString + "&type=album";
console.log(queryString);
if (queryString !== ""){
$.get(urlTarget,queryString,processData);
}
}

$(".search-form").on("submit",function(event){
	console.log("initiate function")
	let testval = $("#search").val();
	console.log(testval);
	submitSearch(testval);
	event.preventDefault();
	})

// album-title path searchResponseObject.albums.items["0"].name
// album-artist path searchResponseObject.albums.items["0"].artists["0"].name 
// album-image path searchResponseObject.albums.items["0"].images["0"].url 

function getTracks(albumID){
	// GET https://api.spotify.com/v1/albums/{id}/tracks

}

function clearLastSearch (){
	let currentSearch = $("li").not(".desc");
	let maxIndex = currentSearch.length;
	for (x = 0; x < maxIndex ; x++){
		$(currentSearch[x]).remove();
	}
	resultsDisplayed = false;
}

function pageReset(){
	clearLastSearch();
		$(".desc").show();
		}
		
function albumPage(){} 



 /* reference
 <!--
          <li>
            <div class="album-wrap">
              <img class="album-art" src="https://i.scdn.co/image/23837f31d4791981db85588e57a86cf2ce5b88e3">
            </div>
            <span class="album-title">Luck of the Draw</span>
            <span class="album-artist">Bonnie Raitt</span>
          </li>
        -->
		
		.albums.items["0"].artists["0"].name
		*/
		