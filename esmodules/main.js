import { DND5E } from '/systems/dnd5e/module/config.js';
import Actor5e from '/systems/dnd5e/module/actor/entity.js';
import Item5e from '/systems/dnd5e/module/item/entity.js';

DND5E.skills["dat"] = "Data";
DND5E.skills["pil"] = "Piloting";
DND5E.skills["tec"] = "Technology";

//Add the skills to the character sheet as a skill if, and only if, the actors being created are npcs or characters
//If the type is vehicle, it makes no changes.
const prepBase = Actor5e.prototype.prepareBaseData;

function extendActorBaseData() {
  console.log("DMPOC | extendActorBaseData");
  console.log(this);
  const dmskills = ['Piloting Skill', 'Data Skill', 'Technology Skill'];
  const itemPiloting = {
    name: 'Piloting Skill',
    type: 'feat',
    data: {
      ability: 'dex',
      formula: 'd20 + @mod + @prof',
      actionType: 'util',
      description: {
        value: '<p>You pilot!</p>',
        chat: 'woah!',
        unidentified: 'what?'
      }
    }
  };
  const pilFound = this.data.items.some(el => el.name === 'Piloting Skill');
  if(pilFound) {
    console.log("DMPOC |  Piloting Skill Exists");
  } else {
    console.log("DMPOC |  Adding Piloting Skill");
    this.createOwnedItem(itemPiloting);
  }
  const itemTechnology = {
    name: 'Technology Skill',
    type: 'feat',
    data: {
      ability: 'int',
      formula: 'd20 + @mod + @prof',
      actionType: 'util',
      description: {
        value: '<p>You technology!</p>',
        chat: 'woah!',
        unidentified: 'what?'
      }
    }
  };
  const tecFound = this.data.items.some(el => el.name === 'Technology Skill');
  if(tecFound) {
    console.log("DMPOC |  Technology Skill Exists");
  } else {
    console.log("DMPOC |  Adding Technology Skill");
    this.createOwnedItem(itemTechnology);
  }
  const itemData = {
    name: 'Data Skill',
    type: 'feat',
    data: {
      ability: 'int',
      formula: 'd20 + @mod + @prof',
      actionType: 'util',
      description: {
        value: '<p>You data!</p>',
        chat: 'woah!',
        unidentified: 'what?'
      }
    }
  };
  const datFound = this.data.items.some(el => el.name === 'Data Skill');
  if(datFound) {
    console.log("DMPOC |  Data Skill Exists");
  } else {
    console.log("DMPOC |  Adding Data Skill");
    this.createOwnedItem(itemData);
  }

  // if (this.data.type === "npc" || this.data.type === "character") {} else {
  //   const atr = this.data.data.attributes;
  //   atr["maneuver"] = atr["maneuver"] || 0;
  //   atr["engineclass"] = atr["engineclass"] || 0;
  // }
  return prepBase.call(this);
}
Actor5e.prototype.prepareBaseData = extendActorBaseData;

// An attempt to shim patch into the derived data method
const prepDerived = Actor5e.prototype.prepareDerivedData;

function extendActorDerivedData() {
  console.log("DMPOC | extendActorDerivedData");
  let skills = this.data.data.skills;
  const pilFound = typeof(skills.pil);
  console.log("TEEEST");
  console.log(pilFound);
  if(pilFound === 'undefined'){
    skills.pil = {
      "value": 0,
      "ability": "dex"
    }
  }
  // for (let [id, skl] of Object.entries(this.data.data.skills)) {
  //   console.log(id);
  //   console.log(skl);
  // }
  return prepDerived.call(this);
}
//Actor5e.prototype.prepareDerivedData = extendActorDerivedData;

// console.log("DMPOC | File Loaded");

Hooks.on("init", function() {
  console.log("DMPOC | This code runs once the Foundry VTT software begins it's initialization workflow.");
});

Hooks.on("ready", function() {
  console.log("DMPOC | This code runs once core initialization is ready and game data is available.");
});
