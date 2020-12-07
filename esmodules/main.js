import { DND5E } from '/systems/dnd5e/module/config.js';
import Actor5e from '/systems/dnd5e/module/actor/entity.js';

DND5E.skills["dat"] = "Data";
DND5E.skills["pil"] = "Piloting";
DND5E.skills["tec"] = "Technology";

Hooks.on("init", async function() {
  console.log("DMPOC | This code runs once the Foundry VTT software begins it's initialization workflow.");
  $('body').addClass('dmpoc');
  const prepData = Actor5e.prototype.prepareData;
  function extendActor5ePrepareData() {
    const skills = this._data.data.skills;
    const type = this.data.type;
    if (type != 'vehicle') {
      skills['pil'] = { value: 0, ability: 'dex', ...skills['pil'] };
      skills['dat'] = { value: 0, ability: 'int', ...skills['dat'] };
      skills['tec'] = { value: 0, ability: 'int', ...skills['tec'] };
    }
    return prepData.call(this);
  }
  Actor5e.prototype.prepareData = extendActor5ePrepareData;
});

Hooks.on("ready", function() {
  console.log("DMPOC | This code runs once core initialization is ready and game data is available.");
});
