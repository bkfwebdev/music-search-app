// get search string from user
// encode search string for get request
// issue get request with encoded string
// log result
// GET https://api.spotify.com/v1/search

var resultsDisplayed = false;
var noAlbumsFound = false;
var blankSearch = $(".desc");

function addListElement (albumTitle,albumArtist,albumArt){
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

function processData(searchResponseObject){
if (resultsDisplayed === true){clearLastSearch();}
console.log(searchResponseObject);
var loopEnd = searchResponseObject.albums.items.length;
if (loopEnd === 0){
	console.log("I got nothing for you son...");
	iGotNothin($("#search").val());
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
	
getTracks();

// track li loop
// trackListData.items[0].name
// trackListData.items[1].name etc


// album-title path searchResponseObject.albums.items["0"].name
// album-artist path searchResponseObject.albums.items["0"].artists["0"].name 
// album-image path searchResponseObject.albums.items["0"].images["0"].url 


function getTracks(){
	//.albums.items[0].id
	//.albums.items[1].id
	// etc
	// GET https://api.spotify.com/v1/albums/3tQd5mwBtVyxCoEo4htGAV/tracks
	let tracksURL = "https://api.spotify.com"
	let albumID = "3ckt1jRTh6Q08fUvEePI7B";
	let targetURL = tracksURL + "/v1/albums/" + albumID + "/tracks?";
	console.log(targetURL);
	$.get(targetURL,albumID,logData);
}
	
	function logData(data){
		let trackListData = data;
		console.log(trackListData);
	}


function clickAlbumEvent (){}

function clearLastSearch (){
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

function pageReset(){
	clearLastSearch();
		$(".desc").show();
		}
		
function albumPage(){}

function iGotNothin(searchValue){
	let noResults = document.createElement("li");
	noResults.setAttribute("class","no-albums desc");
	noResults.innerHTML = "<i class='material-icons icon-help'>help_outline</i>No albums found that match:"+searchValue+".</i>";
	let myAnchor = document.getElementById("albums");
	$(blankSearch).hide();
	myAnchor.appendChild(noResults);
	resultsDisplayed = true;
	noAlbumsFound = true;
}



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
		