export class TBUtils {
    constructor() {

    }

    static get config() {
        return TBConfig;
    }
}
var TBConfig = {
    game: null, //this is set by Game.ts
    world: null, //BootScene tends to set this
};
