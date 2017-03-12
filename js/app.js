// get search string from user
// encode search string for get request
// issue get request with encoded string
// log result
// GET https://api.spotify.com/v1/search
var searchString = prompt("input search string");
var queryString = "";
var urlTarget = "https://api.spotify.com/v1/search"
console.log(searchString)
for (x=0; x< searchString.length; x++){
	if (searchString.substr(x,1) !== " "){
		queryString += searchString.substr(x,1);
	} else {  
		if (searchString.substr(x,1) == " "){
			queryString += "%20";
			}
	}
}
queryString = "q=" + queryString + "&type=album";
console.log(queryString);
if (queryString !== ""){
	$.get (urlTarget, queryString, function(data){
		console.log(data);
	});
	}

