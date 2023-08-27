import React, { useEffect, useState } from "react";
import RecipeCard from "~/components/recipeCard";
import { dbInit } from "~/help/helps";
import { db } from "~/help/db";
import type { ToggleItem, RecipeItem } from "~/help/typeHelps";
import { ToggleButtonGroup } from "~/components/toggleButton";
const initialState = {
  vegetableList: [],
  meatList: [],
  stapleList: [],
};

const BATCH_SIZE = 20;

const Home = () => {
  const [selectStuffList, setSelectStuffList] = useState<{
    vegetableList: ToggleItem[];
    meatList: ToggleItem[];
    stapleList: ToggleItem[];
  }>({
    vegetableList: [],
    meatList: [],
    stapleList: [],
  });
  const [initializationStatus, setInitializationStatus] = useState<
    string | null
  >(null);
  const [result, setResult] = useState<RecipeItem[]>([]);
  const [batchIndex, setBatchIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const updateRecipes = async () => {
      setIsModalOpen(true);
      const selectedItems = Object.values(selectStuffList).flat();
      const filteredRecipes = await db.Recipes.filter((recipe) =>
        selectedItems.some((stuff) => recipe.stuff.includes(stuff.label))
      ).toArray();

      setResult(filteredRecipes);
      setIsModalOpen(false);
    };

    updateRecipes();
  }, [selectStuffList]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setInitializationStatus(localStorage.getItem("dbInit"));
    }
  }, []);

  const handleDatabaseInit = async () => {
    setIsModalOpen(true);
    await dbInit();
    window.location.reload();
  };

  useEffect(() => {
    if (batchIndex * BATCH_SIZE < result.length) {
      const timer = setTimeout(() => {
        setBatchIndex((prevIndex) => prevIndex + 1);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [batchIndex, result]);

  const visibleResults = result.slice(0, batchIndex * BATCH_SIZE + BATCH_SIZE);

  return (
    <div className="flex flex-col space-y-2 overflow-y-auto h-full">
      {(!initializationStatus || initializationStatus === "false") && (
        <button className="btn" onClick={handleDatabaseInit}>
          初始化
        </button>
      )}
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
          onSelect={(selectedItems) =>
            setSelectStuffList((prev) => ({
              ...prev,
              [type]: selectedItems,
            }))
          }
        />
      ))}

      {isModalOpen && (
        <div className="modal">
          <p>处理中，请稍候...</p>
        </div>
      )}

      <div className="flex flex-wrap pb-10 justify-center gap-2 px-4">
        {visibleResults.map((item, Index) => (
          <RecipeCard recipeItem={item} key={Index} />
        ))}
      </div>
    </div>
  );
};

export default Home;
