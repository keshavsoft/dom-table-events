import registerGlobal from "./registerGlobal/index.js";
import bindTableEvents from "./bindTableEvents.js";
import actions from "./actions/index.js";
import state from "./state.js";

export { bindTableEvents, actions, state };

const domTableEvents = {
    bindTableEvents,
    actions,
    state
};

registerGlobal(domTableEvents);

export default domTableEvents;
