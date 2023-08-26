import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

function BottomNavigation() {
  const [activeButtonIndex, setActiveButtonIndex] = useState(0);
  const navigate = useNavigate();
  const buttons = [
    { icon: "majesticons:home-line", label: "主页", path: "/home" },
    { icon: "mdi:compass-outline", label: "帮助", path: "/help" },
    { icon: "icon-park-solid:me", label: "我的", path: "/profile" },
  ];

  useEffect(() => {
    // 在组件渲染后在客户端获取当前路径并设置活动按钮
    const currentPath = window.location.pathname;
    buttons.forEach((button, index) => {
      if (button.path === currentPath) {
        setActiveButtonIndex(index);
      }
    });
  });

  return (
    <div className="btm-nav">
      {buttons.map((button, index) => (
        <button
          key={index}
          className={index === activeButtonIndex ? "active" : ""}
          onClick={() => navigate(button.path)}
        >
          <Icon icon={button.icon} width={50} height={50} />
          <span className="btm-nav-label">{button.label}</span>
        </button>
      ))}
    </div>
  );
}

export default BottomNavigation;
