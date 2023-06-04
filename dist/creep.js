Creep.prototype.update = function() {
    // If you don't have a target, find one 
    if (!this.target) {
        this.target = this.find_target();
    }
}


Creep.prototype.find_target = function() {
    // switch case based on role
    switch (this.role) {
        case 'harvester':
            return this.find_source();
    }
}

Creep.prototype.find_source = function() {
    // create a list of sources that do not have a worker
    let availableSources = [];
    for (let roomName in Game.rooms) {
        let room = Game.rooms[roomName];
        for (let source of room.sources)) {
            if (!source.worker) {
                availableSources.push(source);
            }
        }
    }

    // If there are no available sources, return null
    if (availableSources.length == 0) {
        return null;
    }

    // Find the closest source that doesn't have a worker
    let closestSource = this.pos.findClosestByPath(availableSources);

    // If we found a source, return it
    if (closestSource) {
        return closestSource;
    }



Object.defineProperty(Creep.prototype, 'role', {
    get: function() {
        return this.memory.role;
    },
    set: function(value) {
        this.memory.role = value;
    },
    enumerable: false,
    configurable: true
});


Object.defineProperty(Creep.prototype, 'target', {
    get: function() {
        if (!this._target) {
            this._target = Game.getObjectById(this.memory.target);
        }
        return this._target;
    },
    set: function(value) {
        registerd = value.registerCreep(this);
        if (!registered) {
            console.log(`Creep ${this.name} failed to register with ${value.name}`);
        } else {
            this.memory.target = value.id;
            this._target = value;
        }
    },
    enumerable: false,
    configurable: true
});
