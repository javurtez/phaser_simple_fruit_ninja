/*
  Class is really for Ease-of-use. You can easily call ConstantsEvent.emitter amd do whatever normal event functionality you want there.
  This format just makes it quick an easy to interact with specific events. 
*/

import { EventManager } from "../Managers/EventManager";

export class TBEvent {
    name = "";

    constructor(eventName) {
        this.name = eventName;
    }

    /**********************************************************
    @description Removes All listeners to this event
    @param context Optional parameter, for only clearing listeners from the given context. 
    **********************************************************/
    clear(context = undefined) {
        EventManager.emitter.removeListener(this.name, undefined, context);
    }

    /**********************************************************
    @description Adds listeners to events already declared
    @param callBack Function to call
    @param pContext Where to call the callback from
    **********************************************************/
    addListener(callBack, context) {
        EventManager.emitter.addListener(this.name, callBack, context);
    }

    /**********************************************************
    @description Remove listeners to events already declared
    @param callback Remove only this specific callback from the event
    @param context (optional) Remove the given callback only if it has this context
    @param once (optional) Remove the given callback only if it is ti fire 'once'
    **********************************************************/
    removeListener(callBack, context = undefined, once = false) {
        EventManager.emitter.removeListener(this.name, callBack, context, once);
    }

    /**********************************************************
    @description Dispatch a decalred event
    @param args Any number of arugments to pass to the emitted event
    **********************************************************/
    emit(...args) {
        EventManager.emitter.emit(this.name, ...args);
    }
}
