export default class JSONManager {
    static jsonManagerSingleton;
    static jsonCache;

    static init(p) {
        if (!JSONManager.jsonManagerSingleton) {
            this.jsonManagerSingleton = new JSONManager();
            this.jsonCache = p.cache.json;
        }
        else {
            throw new Error('You can only initialize one manager instance');
        }
    }

    static get Instance() {
        if (!JSONManager.jsonManagerSingleton) {
            throw new Error('initialize Instantiator First!');
        }

        return JSONManager.jsonManagerSingleton;
    }

    getJSON(key) {
        return JSONManager.jsonCache.get(key.path);
    }
}
