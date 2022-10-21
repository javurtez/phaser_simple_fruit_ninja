/*
  Events here are for ease-of-use, the emitter on this class can be used directly.
  The Events classes just provde uick and eays acess to the specific events.
*/

import { TBEvent } from "../Trebert/TBEvent";

export class EventManager {
    //Global Emitter for events (scenes have their own, but this is acessible everywhere)
    static emitter = new Phaser.Events.EventEmitter(); //dont remove or rename me.

    // Event Names -- so they can be easily kept track of
    static ON_BLUR = new TBEvent("ON_BLUR");
    static ON_FOCUS = new TBEvent("ON_FOCUS");

    static ON_PAUSE = new TBEvent("ON_PAUSE");
    static ON_UNPAUSE = new TBEvent("ON_UNPAUSE");

    static CHANGE_LANGUAGE = new TBEvent("CHANGE_LANGUAGE");

    static UPDATE_UI = new TBEvent("UPDATE_UI");
}
