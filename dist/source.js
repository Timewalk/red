// Initialize the memory for sources
if (!Memory.sources) {
    Memory.sources = {};
}

Source.prototype.registerCreep = function(creep) {
    // Check if the source has a worker
    if (this.worker) {
        return false;
    } else {
        this.worker = creep;
        return true;
    }
}

Source.prototype.unregisterCreep = function(creep) {
    if (this.worker === creep) {
        this.worker = null;
        return true;
    } else {
        return false;
    }
}

// Check if the properties are already added
Object.defineProperty(Source.prototype, 'worker', {
    get: function() {
        if(!this._worker) {
            // Fetch the worker from memory
            this._worker = Game.getObjectById(Memory.sources[this.id]?.worker);
        }
        return this._worker;
    },
    set: function(value) {
        // Store the worker id in memory
        Memory.sources[this.id].worker = value.id;
        // Update the local cached worker
        this._worker = value;
    },
    enumerable: false,
    configurable: true
});
        
Object.defineProperty(Source.prototype, 'container', {
    get: function() {
        if (!this._container) {
            // Ensure the memory for this source is initialized
            if (!Memory.sources[this.id]) {
                Memory.sources[this.id] = {};
            }
            
            // Try to get the container from memory
            this._container = Game.getObjectById(Memory.sources[this.id].container);
            
            if (!this._container) {
                // Look for a container in squares adjacent to this source
                let containers = this.pos.findInRange(FIND_STRUCTURES, 1, {
                    filter: { structureType: STRUCTURE_CONTAINER }
                });

                // If a container was found, use the first one
                if (containers.length > 0) {
                    this._container = containers[0];
                    Memory.sources[this.id].container = this._container.id;
                } else {
                    // Look for a container construction site in squares adjacent to this source
                    let constructionSites = this.pos.findInRange(
                        FIND_CONSTRUCTION_SITES, 1, {
                            filter: { structureType: STRUCTURE_CONTAINER }
                    });

                    // If a construction site was found, use the first one
                    if (constructionSites.length > 0) {
                        this._container = constructionSites[0];
                        Memory.sources[this.id].container = this._container.id;
                    }
                }
            }
        }

        return this._container;
    },
    enumerable: false,
    configurable: true
});

console.log('dist/source.js');
