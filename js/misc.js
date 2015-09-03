/** CLASS DATA ARRAY **/

Misc = function() {}
Misc.Game =
{
	STARTED : 0,
	STOPPED : 1
};
Misc.Difficulty =
{
	NORMAL : 0,
	MEDIUM: 1,
	HARD: 2
};
Misc.Control =
{
	LEFT : 37,
	RIGHT: 39,
	UP: 38,
	DOWN: 40,
	ENTER: 13
};
Misc.PicturesCard = 
{
	COVER : "ressources/card_bg.gif",
	LOGO :  "ressources/logo.png",
	BACKGROUND: "ressources/colour[ID].gif"
}
Element.addMethods({
    clear: function(element) {
        element = $(element);

        element.descendants().each(function(elem) {
            Event.stopObserving(elem);
            elem.remove();
        });

        return element.update();
    }
});

Misc.shuffle = function (array) {
    var counter = array.length, temp, index;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

Misc.getPosFromIndex = function(index) {
	var posY = parseInt(index / 4);
	var posX = index - (posY * 4);
	return [posX, posY];
}
Misc.getIndexFromPos = function(posX, posY) {
	return (posY * 4) + posX;
}
Misc.checkCardsColor = function(cards) {
	if (cards[0].color == cards[1].color) {
		return true;
	}
	return false;
}
Misc.getButtoninfoFromStatus = function(status) {
	switch (status) {
		case this.Game.STARTED :
		return {"class": "stop", "name": "Stop Game"};
		case this.Game.STOPPED :
		return {"class": "start", "name": "Start Game"};
	}
}
