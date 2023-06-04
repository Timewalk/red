module.exports = function() {
  // Include the Room file
  require('room')();

  // Add an 'update' method to the Game prototype
  Game.prototype.update = function() {
    // Loop through each room in Game.rooms
    for(let name in this.rooms) {
      // Call the room's 'update' method
      this.rooms[name].update();
    }
  }
}

