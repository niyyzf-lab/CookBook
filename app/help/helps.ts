import type { RecipeItem } from "./db";
import { db } from "./db";
import recipe from "../../public/data/recipe.json";
import stuff from "../../public/data/stuff.json";

export async function dbInit() {
  const dbInit = localStorage.getItem("dbInit");
  if (dbInit === "true") {
    console.log(await db.Recipes.toArray());
  }
  if (dbInit !== "true") {
    if (dbInit === "false") {
      // 清空数据库
      await db.delete();
    }

    console.table(recipe);
    const recipeData: RecipeItem[] = recipe as RecipeItem[];
    console.log(recipeData);
    const stuffs = recipeData.flatMap((item) => item.stuff);
    const stuffsSet = new Set(stuffs);
    const stuffsList = stuff.filter((stuffItem) =>
      stuffsSet.has(stuffItem.name)
    );
    await db.Stuff.bulkPut(stuffsList as any);
    await db.Recipes.bulkPut(recipeData);

    localStorage.setItem("dbInit", "true");
    console.log("数据库初始化完成");
    console.log(localStorage.getItem("dbInit"));
  } else {
    console.log("数据库已经初始化过");
  }
}
