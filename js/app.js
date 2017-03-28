// Bryant Feld TechDegree Project 5
//----------------------------------

// Variables

var resultsDisplayed = false;
var noAlbumsFound = false;
var blankSearch = $(".desc");

// Functions

function addListElement (albumTitle,albumArtist,albumArt){
// adds albums to the page
	 let newAlbum = document.createElement("li");
	 let newDiv = document.createElement("div");
	 let newImage = document.createElement("img");
	 let albumTitleSpan  = document.createElement("span");
	 let artistNameSpan = document.createElement("span");
	 let albumList = document.getElementById("albums");
	 if (resultsDisplayed === false){$(blankSearch).remove();}
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
} 

function iGotNothin(searchValue){
// alerts the user than there were no search results
	let noResults = document.createElement("li");
	noResults.setAttribute("class","no-albums desc");
	noResults.innerHTML = "<i class='material-icons icon-help'>help_outline</i>No albums found that match:"+searchValue+".</i>";
	let myAnchor = document.getElementById("albums");
	$(blankSearch).hide();
	myAnchor.appendChild(noResults);
	resultsDisplayed = true;
	noAlbumsFound = true;
}

function clearLastSearch (){
// clears previous results so new results can be displayed
	let currentSearch = $("li").not(".desc");
	let maxIndex = currentSearch.length;
	for (x = 0; x < maxIndex ; x++){
		$(currentSearch[x]).remove();
	}
	if (noAlbumsFound === true)
	{
		$(".no-albums").remove();
		}
	resultsDisplayed = false;
}

function processData(searchResponseObject){
// display results of search
if (resultsDisplayed === true){clearLastSearch();}
console.log(searchResponseObject);
var loopEnd = searchResponseObject.albums.items.length;
if (loopEnd === 0){iGotNothin($("#search").val());
} else {
for (index = 0; index < loopEnd; index ++){
let currentAlbum = searchResponseObject.albums.items[index].name;
let currentArtist = searchResponseObject.albums.items[index].artists[0].name;
let currentImage = searchResponseObject.albums.items[index].images[0 ].url;
addListElement(currentAlbum,currentArtist,currentImage);
}
}
resultsDisplayed = true;
}

function submitSearch (userInput){
// submit search query to spotify api
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
if (queryString !== ""){
$.get(urlTarget,queryString,processData);
}
}

$(".search-form").on("submit",function(event){
	// get search target from user
	let testval = $("#search").val();
	submitSearch(testval);
	event.preventDefault();
	});

		