module.exports = function() {
    
    Room.prototype.update = function() {
        // If there is no memory for this room or no sources in memory, find the sources
        if (!Memory.rooms[this.name] || !Memory.rooms[this.name].sources) {
          // Find all sources in the room and store their ids in memory
          let sources = this.find(FIND_SOURCES);
          Memory.rooms[this.name].sources = sources.map(source => source.id);
        }

        // For each source in memory, try to build a container
        for (let sourceId of Memory.rooms[this.name].sources) {
          this.build_containers(sourceId);
        }
      }

  Room.prototype.build_containers = function(source) {
    // Check if the source already has a container
    if (!source.container) {
      // Find all the open spots around the source
      let openSpots = this.lookForAtArea(
        LOOK_TERRAIN,
        source.pos.y - 1,
        source.pos.x - 1,
        source.pos.y + 1,
        source.pos.x + 1,
        true
      );

      // Filter the spots where it's possible to build
      openSpots = openSpots.filter(s => s.terrain != 'wall');

      let constructionSiteId = null;

      for (let spot of openSpots) {
        // Create a construction site for a new container
        let res = this.createConstructionSite(spot.x, spot.y, STRUCTURE_CONTAINER);

        if (res === OK) {
          console.log(`Construction site for a new container has been placed at (${spot.x}, ${spot.y})`);

          // Find the newly created construction site and store its id
          let constructionSite = this.lookForAt(LOOK_CONSTRUCTION_SITES, spot.x, spot.y)[0];
          constructionSiteId = constructionSite.id;

          break;
        }
      }

      // If we were able to create a construction site, store its id in the source's memory
      if (constructionSiteId) {
        source.container = Game.getObjectById(constructionSiteId);
      } else {
        console.log('No available spots to build a container next to the source at (' + source.pos.x + ', ' + source.pos.y + ')');
      }
    }
  }
}

