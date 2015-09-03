
var Board = function() {
	this.score = 0;
	this.difficulty = -1;
	this.status = Misc.Game.STOPPED;
	this.player = null;
	this.cards = [];
	this.disabledCards = [];
	this.cardsArray = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
	this.cardIdx = 0;

	this.scoreElement = null;
	this.buttonElement = null;

	var board = this;
	this.funcKeyEvent = function(event) {
		board.onKeyPressed(event);
	}
	this.funcButtonEvent = function(event) {
		if (board.status == Misc.Game.STARTED) {
			board.stopGame();
			board.checkGameValidity();
		} else {
			board.startGame();
		}
		board.updateButton();
	}
};




/** BASIC START GAME ROUTINE **/
Board.prototype.startGame = function(difficulty) {

	
	this.initData();
	this.initLayouts();
	this.initControls();
	this.generateCards();
	this.renderCards();

	this.player = new Player(this);
};
Board.prototype.stopGame = function() {
	this.status = Misc.Game.STOPPED;
	this.updateButton();
};

/** ENGINE FUNCTIONS **/

Board.prototype.initData = function() {
	this.status = Misc.Game.STARTED;
	this.score = 0;
	this.player = null;
	this.cards = [];
	this.disabledCards = [];
	this.cardIdx = 0;
	this.scoreElement = null;
	this.buttonElement = null;

	window.removeEventListener('keydown', this.funcKeyEvent);
};
Board.prototype.initLayouts = function() {
	this.updateScore(0);
	this.updateButton();
};
Board.prototype.initControls = function() {
	window.addEventListener('keydown', this.funcKeyEvent);
};
Board.prototype.generateCards = function() {
	var shuffle = Misc.shuffle(this.cardsArray);

	for (var i = 0; i < shuffle.length; i++) {
		var card = new Card(i, shuffle[i]);
		this.cards.push(card);
	}
};

Board.prototype.renderCards = function() {
	$('cards_container').clear();
	for (var i = 0; i < this.cards.length; i++) {
		$('cards_container').insert(this.cards[i].element);
		this.cards[i].setBackground();
	}
	this.updateSelectedCard(0, 0);
};

/** KEYBOARD CONTROL **/

Board.prototype.onKeyPressed = function(event) {
	if (this.status == Misc.Game.STOPPED) {
		return;
	}

	var oldPlayerIdx = this.player.getIndexFromPos();
	var newPlayerIdx = oldPlayerIdx;

	switch (event.keyCode) {
		case Misc.Control.LEFT :
			newPlayerIdx = this.player.onKeyLeftPressed();
			break;
		case Misc.Control.RIGHT :
			newPlayerIdx = this.player.onKeyRightPressed();
			break;
		case Misc.Control.UP :
			newPlayerIdx = this.player.onKeyUpPressed();
			break;	
		case Misc.Control.DOWN :
			newPlayerIdx = this.player.onKeyDownPressed();
			break;
		case Misc.Control.ENTER :
			newPlayerIdx = this.player.onKeyEnterPressed();
			break;
	}
	this.updateSelectedCard(oldPlayerIdx, newPlayerIdx);
};

Board.prototype.updateSelectedCard = function(oldPlayerIdx, newPlayerIdx) {
	this.cards[oldPlayerIdx].unSelect();
	this.cards[newPlayerIdx].select();
};
Board.prototype.updateScore = function(score) {
	this.score = this.score + score;
	if ($('score')) {
		$('score').remove();
	}
	if ($('score_hidden')) {
		$('score_hidden').remove();
	}
	this.scoreElement = "<span id='score'> Score : " + this.score + "</span>";
	$$('.game_info').invoke("insert", this.scoreElement);
	$$('.game_info').invoke("insert", "<input id='score_hidden' type='hidden' value='"+this.score+"' />");
};

Board.prototype.updateButton = function() {
	if ($('action_button')) {
		$('action_button').stopObserving('click', this.funcButtonEvent);
		$('action_button').remove();
	}
	var board = this;
	var button_info = Misc.getButtoninfoFromStatus(this.status);
	this.buttonElement = "<button id='action_button' class='"+button_info["class"]+"'>"+button_info["name"]+"</button>";
	$$('.game_buttons').invoke("insert", this.buttonElement);
	$('action_button').on('click', 'button', this.funcButtonEvent);
};

Board.prototype.checkGameValidity = function() {
	if (this.status == Misc.Game.STOPPED) {
		$('popup').setStyle({display: 'block'});
		this.stopGame();
	} else if (this.status == Misc.Game.STARTED && this.disabledCards.length == 16) {
		$('popup').setStyle({display: 'block'});
		this.stopGame();
	}
};