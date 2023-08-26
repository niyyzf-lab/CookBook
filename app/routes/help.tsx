import React from "react";
import { db } from "~/help/db";
function Help() {
  //删除数据
  const [dbInit, setDbInit] = React.useState(false);
  const deleteData = () => {
    db.Recipes.clear().then(() => {
      db.Stuff.clear().then(() => {
        setDbInit(true);
      });
    });
    //删除loaclStorage
    localStorage.removeItem("dbInit");
  };
  return (
    <div>
      <button className="btn" onClick={() => deleteData()}>
        {dbInit ? "已删除" : "删除数据"}
      </button>
    </div>
  );
}

export default Help;
