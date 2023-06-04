Room.prototype.update = function() {
    // Initialize the room's memory
    this.init();

    // Manage the room's sources
    for (let sourceId of Memory.rooms[this.name].sources) {
        this.build_containers(sourceId);
    }

    // Manage Creeps in this room
}

// Initialize the room's memory
Room.prototype.init = function() {
    // Initialize the room's memory if it's not already initialized
    if (!Memory.rooms[this.name]) {
        console.log('Initializing memory for room ' + this.name);
        Memory.rooms[this.name] = {};
    }

    // find all the sources in the room
    if (!Memory.sources) {
        Memory.sources = {};
    }



    // Initialize the room's sources memory if it's not already initialized
    if (!Memory.rooms[this.name].sources) {
        console.log('Finding sources in room ' + this.name);
        let sources = this.find(FIND_SOURCES);
        console.log('Found ' + sources.length + ' sources');
        Memory.rooms[this.name].sources = sources.map(source => source.id);
    }
}

Room.prototype.build_containers = function(sourceId) {
    // Get the source object
    let source = Game.getObjectById(sourceId);

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

        for (let spot of openSpots) {
            // Create a construction site for a new container
            let res = this.createConstructionSite(spot.x, spot.y, STRUCTURE_CONTAINER);

            if (res === OK) {
                console.log(`Construction site for a new container has been placed at (${spot.x}, ${spot.y})`);

                // Find the newly created construction site and store it in the source's memory
                let constructionSite = this.lookForAt(LOOK_CONSTRUCTION_SITES,
                    spot.x, spot.y)[0];

                // If we were able to create a construction site, store it in the source's memory
                if (constructionSite) {
                    source.container = constructionSite;
                } 

                break;
            }
        }

        if (!source.container) {
            console.log('No available spots to build a container next to the source at (' + source.pos.x + ', ' + source.pos.y + ')');
        }
    }
}

Object.defineProperty(Room.prototype, 'sources', {
    get: function() {
        if (!this._sources) {
            if (!Memory.rooms[this.name].sources) {
                let sources = this.find(FIND_SOURCES);
                Memory.rooms[this.name].sources = sources.map(source => source.id);
                this._sources = sources;
            }
        }
        return this._sources;
    },
    enumerable: false,
    configurable: true
});


console.log('dist/room.js');

