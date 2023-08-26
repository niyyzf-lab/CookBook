export interface ToggleItem {
  label: string;
  icon: string;
}

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
   * 视频封面
   */
  pic?: string;
  /**视频标题 */
  title?: string;
  /**作者头像 */
  face?: string;
  /**视频数据 */
  stat?: {
    /**投币数 */
    coin?: number;
    /**收藏数 */
    favorite?: number;
    /**点赞数 */
    like?: number;
  };
}
