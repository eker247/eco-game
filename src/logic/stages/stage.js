"use strict";
exports.__esModule = true;
var player_1 = require("../player");
var Stage = /** @class */ (function () {
    function Stage() {
        this.stagePlayers = player_1.PlayerService.getPlayersAscending();
        this.setStagePlayers();
    }
    Stage.prototype.getCurrentPlayer = function () {
        if (this.stagePlayers.length < 1) {
            throw new Error('Stage.getCurrentPlayer - Players not exist');
        }
        return this.stagePlayers[0];
    };
    Stage.prototype.removeCurrentPlayer = function () {
        if (!this.stagePlayers.length) {
            throw new Error('Stage.removeCurrentPlayer - There is no player');
        }
        this.stagePlayers = this.stagePlayers.slice(1);
    };
    Stage.prototype.isStageFinished = function () {
        return !(this.stagePlayers || []).length;
    };
    return Stage;
}());
exports.Stage = Stage;
