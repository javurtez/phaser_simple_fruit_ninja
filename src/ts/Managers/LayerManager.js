export default class LayerManager {
    scene;
    layers;
    defaultLayer;

    constructor(scene) {
        this.scene = scene;
        this.layers = new Map();
        this.defaultLayer = "";
    }

    destroy() {
        this.layers.clear();
        this.layers = undefined;
    }

    addLayer(layerName, setAsDefault = false) {
        if (this.layers == undefined) {
            console.warn("[LayerManager] (addLayer) this.layers is undefined, has LayerManager already had destroy() called? Aborting.");
            return;
        }
        if (this.layers.has(layerName)) {
            console.warn("[LayerManager] (addLayer) layer already exists: " + layerName);
            return;
        }

        if (setAsDefault || this.defaultLayer.length < 1) {
            this.defaultLayer = layerName;
        }

        let newLayer = this.scene.add.layer();
        this.layers.set(layerName, newLayer);

        return newLayer;
    }
    getLayer(layerName) {
        if (this.layers == undefined) {
            console.warn("[LayerManager] (getLayer) this.layers is undefined, has LayerManager already had destroy() called? Aborting.");
            return;
        }
        if (this.layers.has(layerName) == false) {
            console.warn("[LayerManager] (getLayer) Layer " + layerName + " does not exist");
            return;
        }

        return this.layers.get(layerName);
    }
    removeLayer(layerName) {
        if (this.layers == undefined) {
            console.warn("[LayerManager] (removeLayer) this.layers is undefined, has LayerManager already had destroy() called? Aborting.");
            return;
        }
        if (this.layers.has(layerName) == false) {
            console.warn("[LayerManager] (removeLayer) Layer " + layerName + " does not exist");
            return;
        }

        let tLayer = this.layers.get(layerName);
        tLayer.destroy();
        this.layers.delete(layerName);
    }
    setLayerDepth(layerName, depth, willSortLayers = true) {
        let tLayer = this.getLayer(layerName);
        tLayer.setDepth(depth);

        if (willSortLayers) {
            this.sortLayersByDepth();
        }
    }
    sortLayersByDepth() {
        if (this.layers == undefined) {
            console.warn("[LayerManager] (addLayer) this.layers is undefined, has LayerManager already had destroy() called? Aborting.");
            return;
        }
        this.layers = new Map([...this.layers.entries()].sort((a, b) => b[1].depth - a[1].depth));
    }
    setMainLayer(layerName) {
        this.defaultLayer = layerName;
    }
    addObject(object, layerName) {
        // look for default layer
        if (layerName == undefined && this.defaultLayer != undefined) {
            layerName = this.defaultLayer;
        }

        // if we cannot add it to the layer, return
        if (layerName == undefined || this.layers.has(layerName) == false) {
            console.warn("[LayerManager] (addObject) Trying to add element to non-existant layer " + layerName);
            return object;
        }

        // add element to correct layer array
        let tLayer = this.layers.get(layerName);
        tLayer.add(object);

        //name the element
        let elementNum = tLayer.length - 1;
        object.name = layerName + "_object_" + elementNum + "_" + object.type;

        //initalize
        if (typeof object["init"] == 'function') {
            object["init"]();
        }

        return object;
    }

    moveObjectToLayer(object, oldLayerName, newLayerName) {
        let tOldLayer = this.layers.get(oldLayerName);
        tOldLayer.remove(object);

        let tLayer = this.layers.get(newLayerName);
        tLayer.add(object);

        let elementNum = tLayer.length - 1;
        object.name = newLayerName + "_object_" + elementNum + "_" + object.type;
    }

    update(time, delta) {
        if (typeof this.scene == 'undefined') return;

        for (let layer of this.layers.values()) {
            let tI = layer.length;
            while (tI-- > 0) {
                let element = layer.getAt(tI);
                element.update(time, delta);

                if (element.doDelete) {
                    element.destroy();
                }
            }
        }
    }
}
