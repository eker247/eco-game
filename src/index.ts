import { PlayerService, Player } from "./logic/player";
import { SharedError } from "./logic/shared";
import { StationStage } from "./logic/stages/station";

// PlayerService.setPlayers();
// while (!PlayerService.isGameOver()) {
// let players = PlayerService.getPlayersAscending();
//   const stationStage = new StationStage(players);
//   while (players) {
//     const player = stationStage.getCurrentPlayer();
//     const currentStations = stationStage.getStationsToBuy();
//     const nextStations = stationStage.getNextStations();
//     stationStage.setActualStation(currentStations[0], player, currentStations[0].price);
//     stationStage.playersAbleToBuy.forEach(currentPlayer => {
//       stationStage.outbidAuction(currentPlayer, stationStage.actualPrice + 1);
//     });
//   }
// }
const shared = new StationStage();

let players = PlayerService.getPlayersAscending();
console.log('Players:', players);
