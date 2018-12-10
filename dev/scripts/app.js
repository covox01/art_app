const artApp = {
	apiKey: 'NYUbDvNc'
};

artApp.displayPieces = function(data) {
	// data.forEach(function(artObject){
	// 	console.log(artObject);
	// });
	const artHtml = data.filter(function(artObj){
			return artObj.webImage
		}).map(function(artObj){
			let artPieceHtml = `
			<div class="piece">
				<h2>${artObj.title}</h2>
				<p class="artist">${artObj.principalOrFirstMaker}</p>
				<img src="${artObj.webImage.url}" alt="">
			</div>`;
		return artPieceHtml;
	}).join('');
	$('#artwork').empty().append(artHtml);
};


artApp.getPieces = function(query){
	$.ajax({
		url: 'https://www.rijksmuseum.nl/api/en/collection',
		method: 'GET',
		dataType: 'json',
		data: {
			key: artApp.apiKey,
			format: 'json',
			q: query,
			imgonly: true
		},

	}).then(function(result) {
		console.log(result.artObjects);
		artApp.displayPieces(result.artObjects);
	})
}


$("#animal").on("change", function(){
	const animal = $(this).val();
	const animalName = $(this).find(':selected').text();
	artApp.updateTitle(animalName);
	artApp.getPieces(animal);
	console.log(animal)
});

artApp.updateTitle = function(subject){
	$("#page-title").find("span").text(subject);
	
};


artApp.init = function(){
	artApp.getPieces('monkeys')
	// artApp.getPieces('eagles')
	// artApp.getPieces('elephants')
	// artApp.getPieces('centaur');
}


$(function(){
	artApp.init();
});