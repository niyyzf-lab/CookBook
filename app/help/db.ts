import type { Table } from "dexie";
import Dexie from "dexie";
import type { VideoDataItem } from "./typeHelps";

export type Difficulty = "简单" | "普通" | "困难";

export interface RecipeItem {
  /**
   * 菜名
   */
  name: string;
  /**
   * 链接
   */
  link?: string;
  /**
   * video id
   */
  bv?: string;
  /**
   * 材料
   */
  stuff: string[];
  /**
   * 根据材料生成
   */
  emojis?: string[];
  /**
   * 难度
   */
  difficulty?: Difficulty | "";
  /**
   * 标签
   */
  tags?: string[];
  /**
   * 方式
   */
  methods?: string[];
  /**
   * 工具
   */
  tools: string[];
  /**
   * 视频信息
   */
  videoData?: VideoDataItem;
}
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
        "++,name,link,bv,*stuff,emojis,difficulty,*tags,*methods,videoData", // Primary key and indexed props
      Stuff: "++,name,type,icon",
    });
  }
}

export const db = new recipeClassedDexie();
