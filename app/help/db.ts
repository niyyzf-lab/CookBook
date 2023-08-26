import type { Table } from "dexie";
import Dexie from "dexie";
import type { RecipeItem } from "./typeHelps";

export interface StuffItem {
  name: string;
  type: string;
  icon: string;
}
export class recipeClassedDexie extends Dexie {
  Recipes!: Table<RecipeItem>;
  Stuff!: Table<string>;

  constructor() {
    super("recipeDatabase");
    this.version(1).stores({
      Recipes:
        "++,name,link,bv,*stuff,emojis,difficulty,*tags,*methods,pic,title,face,stat", // Primary key and indexed props
      Stuff: "++,name,type,icon",
    });
  }
}

export const db = new recipeClassedDexie();
