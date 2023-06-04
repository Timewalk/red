let gameManager = {
  run: function() {
    // Loop through each room in Game.rooms
    for(let name in Game.rooms) {
      // Call the room's 'update' method
      Game.rooms[name].update();
    }
  }
}

module.exports = gameManager;

