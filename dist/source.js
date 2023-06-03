module.exports = function() {
    // Check if Memory.sources is already initialized
    if (!Memory.sources) {
        Memory.sources = {};
    }

    // Check if the properties are already added
    if(!Source.prototype.worker) {
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
    }
    
    if(!Source.prototype.container) {
        Object.defineProperty(Source.prototype, 'container', {
            get: function() {
                // Ensure the memory for this source is initialized
                if (!Memory.sources[this.id]) {
                    Memory.sources[this.id] = {};
                }

                if(!this._container) {
                    // Fetch the container from memory
                    this._container = Game.getObjectById(Memory.sources[this.id].container);
                }
                return this._container;
            },
            set: function(value) {
                // Ensure the memory for this source is initialized
                if (!Memory.sources[this.id]) {
                    Memory.sources[this.id] = {};
                }

                // Store the container id in memory
                Memory.sources[this.id].container = value.id;
                // Update the local cached container
                this._container = value;
            },
            enumerable: false,
            configurable: true
        });
    }
}
