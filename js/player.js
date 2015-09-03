var Player = function(board) {
	this.posX = 0;
	this.posY = 0;
	this.index = 0;
	this.board = board;
	this.selectedCard = [];
};


Player.prototype.getIndexFromPos = function() {
	return Misc.getIndexFromPos(this.posX, this.posY);
};
Player.prototype.getPosFromIndex = function() {
	return Misc.getPosFromIndex(this.index);
};

Player.prototype.updatePos = function() {
	var pos =  Misc.getPosFromIndex(this.index);
	this.posX = pos[0];
	this.posY = pos[1];
};
Player.prototype.updateScore = function(score) {
	this.score = score;
};

/** KEYBOARD CONTROL **/
Player.prototype.onKeyLeftPressed = function() {
	if (this.index - 1 >= 0) {
		this.index = this.index - 1;
	}
	this.updatePos();
	return this.index;
};
Player.prototype.onKeyRightPressed = function() {
	if (this.index + 1 < 16) {
		this.index = this.index + 1;
	}
	this.updatePos();
	return this.index;
};
Player.prototype.onKeyUpPressed = function() {
	if (this.index - 4 >= 0) {
		this.index = this.index - 4;
	}
	this.updatePos();
	return this.index;
};
Player.prototype.onKeyDownPressed = function() {
	if (this.index + 4 < 16) {
		this.index = this.index + 4;
	}
	this.updatePos();
	return this.index;
};
Player.prototype.onKeyEnterPressed = function() {
	var points = 0;
	var pickedCard = this.board.cards[this.index];

	if (pickedCard.status == 1 && pickedCard.isSelected == false && this.selectedCard.length < 2) {
		pickedCard.pick();
		this.selectedCard.push(pickedCard);
	}

	if (this.selectedCard.length == 2) {
		if (Misc.checkCardsColor(this.selectedCard)) {
			points = 1;
			var player = this;
			setTimeout(function(){ 
				player.board.disabledCards = player.board.disabledCards.concat(player.selectedCard);
				player.selectedCard[0].desactivate();
				player.selectedCard[1].desactivate();
				player.selectedCard = [];

				player.board.checkGameValidity();
			}, 1500);
		} else {
			var player = this;
			setTimeout(function(){ 
				player.selectedCard[0].unPick();
				player.selectedCard[1].unPick();
				player.selectedCard = [];

				player.board.checkGameValidity();
			}, 1500);
		}
	}
	
	this.board.updateScore(points);
	this.updatePos();
	return this.index;
};