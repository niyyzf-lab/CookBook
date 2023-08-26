import React, { useEffect, useState } from "react";
import { ToggleButtonGroup } from "../components/toggleButton";
import RecipeCard from "~/components/recipeCard";
import { dbInit } from "~/help/helps";
import { db } from "~/help/db";
import type { ToggleItem } from "~/help/typeHelps";
import type { RecipeItem } from "~/help/db";
import Masonry from "react-masonry-css";

const initialState = {
  vegetableList: [],
  meatList: [],
  stapleList: [],
};

const BATCH_SIZE = 10; // 每批渲染的卡片数量

const Home = () => {
  const [selectStuffList, setSelectStuffList] = useState<ToggleItem[]>([]);
  const [initializationStatus, setInitializationStatus] = useState<
    string | null
  >(null);
  const [result, setResult] = useState<RecipeItem[]>([]);
  const [toggleLists, setToggleLists] = useState(initialState);
  const [batchIndex, setBatchIndex] = useState(0);

  useEffect(() => {
    setSelectStuffList([
      ...toggleLists.vegetableList,
      ...toggleLists.meatList,
      ...toggleLists.stapleList,
    ]);
  }, [toggleLists]);

  useEffect(() => {
    const updateRecipes = async () => {
      const filteredRecipes = await db.Recipes.filter(
        (recipe: { stuff: string | string[] }) => {
          return selectStuffList.some((stuff) =>
            recipe.stuff.includes(stuff.label)
          );
        }
      ).toArray();

      setResult(filteredRecipes);
    };

    updateRecipes();
  }, [selectStuffList]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setInitializationStatus(localStorage.getItem("dbInit"));
    }
  }, []);

  const handleDatabaseInit = async () => {
    await dbInit();
    window.location.reload();
  };

  useEffect(() => {
    if (batchIndex * BATCH_SIZE < result.length) {
      const timer = setTimeout(() => {
        setBatchIndex((prevIndex) => prevIndex + 1);
      }, 100); // 添加一个延迟以平滑渲染
      return () => clearTimeout(timer);
    }
  }, [batchIndex, result]);

  const visibleResults = result.slice(0, batchIndex * BATCH_SIZE + BATCH_SIZE);

  const breakpointColumnsObj = {
    default: 6,
    1600: 4,
    1100: 2,
    700: 1,
  };

  return (
    <div className="flex flex-col space-y-2 overflow-y-auto h-full">
      {initializationStatus === null || initializationStatus === "false" ? (
        <button className="btn" onClick={handleDatabaseInit}>
          初始化
        </button>
      ) : null}
      {Object.keys(initialState).map((type) => (
        <ToggleButtonGroup
          key={type}
          type={
            type === "vegetableList"
              ? "蔬菜"
              : type === "meatList"
              ? "肉类"
              : "主食"
          }
          color={
            type === "vegetableList"
              ? "green"
              : type === "meatList"
              ? "red"
              : "yellow"
          }
          onSelect={(items) =>
            setToggleLists((prevState) => ({ ...prevState, [type]: items }))
          }
        />
      ))}

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex w-full  justify-between"
        columnClassName=" space-y-2"
      >
        {visibleResults
          .filter((item) => item !== null)
          .map((item) => (
            <div key={item.name} className=" flex flex-col items-center">
              <RecipeCard recipeItem={item} />
            </div>
          ))}
      </Masonry>
    </div>
  );
};

export default Home;
