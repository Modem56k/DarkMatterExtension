import { DND5E } from '/systems/dnd5e/module/config.js';
import Actor5e from '/systems/dnd5e/module/actor/entity.js';
import ActorSheet5eVehicle from '/systems/dnd5e/module/actor/sheets/vehicle.js';

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

export class DarkMatterShipSheet extends ActorSheet5eVehicle {

  get template() {
    if ( !game.user.isGM && this.actor.limited ) return "systems/dnd5e/templates/actors/limited-sheet.html";
    return `modules/dmpoc/templates/${this.actor.data.type}-sheet.html`;
  }

}

Actors.registerSheet('dnd5e',
  DarkMatterShipSheet,
  {
    label: 'Dark Matter Ship',
    makeDefault: false,
    types: ['vehicle'],
  }
);

Hooks.on("ready", function() {
  console.log("DMPOC | This code runs once core initialization is ready and game data is available.");
});
