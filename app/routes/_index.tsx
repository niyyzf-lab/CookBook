import { useEffect } from "react";
import { useNavigate } from "@remix-run/react";

export default function Index() {
  const navigate = useNavigate();
  useEffect(() => {
    //创建5秒延迟
    const dbInit = localStorage.getItem("dbInit");
    if (!dbInit) {
      setTimeout(() => {
        navigate("/home", { replace: true });
      }, 50);
    } else {
      navigate("/home", { replace: true });
    }
  }, [navigate]);

  return (
    <div className=" w-screen h-screen flex flex-col items-center ">
      <div className=" justify-center ">数据缓冲中.....</div>
      <div>
        <progress className="progress w-56"></progress>
      </div>
    </div>
  );
}
