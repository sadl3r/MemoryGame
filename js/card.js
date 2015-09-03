var Card = function(index, colorId) {
	this.id = index;
	this.isSelected = false;
	this.index = index;
	this.posY = parseInt(index / 4);
	this.posX = index - (this.posY * 4);
	this.color = colorId;
	this.status = 1;
	this.element  = '<div class="card card_' + this.id+'"><img src="'+ Misc.PicturesCard.COVER+'"/></div>'
	console.log("Creating cart posx "  + this.posX + " and posy "+ this.posY + " with color id " + colorId);
};


Card.prototype.getIndexFromPos = function() {
	return Misc.getIndexFromPos(this.posX, this.posY);
};
Card.prototype.getPosFromIndex = function() {
	return Misc.getPosFromIndex(this.index);
};

/** CARD ACTION FUNCTION **/
Card.prototype.unSelect = function() {
	$$('.card_'+this.id).invoke('removeClassName', 'selected');
};
Card.prototype.select = function() {
	$$('.card_'+this.id).invoke('addClassName', 'selected');
};
Card.prototype.setBackground = function() {
	var colorPicture = Misc.PicturesCard.BACKGROUND.replace("[ID]", this.color);
	$$('.card_'+this.id).invoke('setStyle', {backgroundImage: 'url(' + colorPicture + ')'});
};

Card.prototype.pick = function() {
	$$('.card_'+this.id+' img').invoke('addClassName', 'pick');
	$$('.card_'+this.id+' img').invoke('removeClassName', 'unpick');
	this.isSelected = true;
};
Card.prototype.unPick = function() {
	$$('.card_'+this.id+' img').invoke('addClassName', 'unpick');
	$$('.card_'+this.id+' img').invoke('removeClassName', 'pick');
	this.isSelected = false;
};

Card.prototype.desactivate = function() {
	$$('.card_'+this.id).invoke('addClassName', 'disabled');
	this.isSelected = false;
	this.status = false;
};