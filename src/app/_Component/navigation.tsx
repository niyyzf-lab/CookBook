"use client";
import React from "react";
import Link from "next/link";
import { Flex, Box } from "@radix-ui/themes";
/**
 * 导入图标
 */
import { Icon } from "@iconify/react";

function Navigation() {
  return (
    <Flex
      className="sm:px-20 px-9"
      width={"100%"}
      wrap={"wrap"}
      justify={"between"}
    >
      <Link href="/">
        <Box className="flex flex-col items-center">
          <Icon icon="ri:home-line" className=" text-3xl md:text-3xl" />
          <span className="md:text-lg text-sm">首页</span>
        </Box>
      </Link>
      <Link href="/whatToEat">
        <Box className="flex flex-col items-center">
          <Icon icon="ri:compass-2-line" className=" text-3xl md:text-3xl" />
          <span className="md:text-lg text-sm">吃什么</span>
        </Box>
      </Link>
      <Link href="/help">
        <Box className="flex flex-col items-center">
          <Icon icon="ri:question-line" className="text-3xl md:text-3xl" />
          <span className="md:text-lg text-sm">帮助</span>
        </Box>
      </Link>
      <Link href="/mine">
        <Box className="flex flex-col items-center">
          <Icon icon="ri:user-line" className="text-3xl md:text-3xl" />
          <span className="md:text-lg text-sm">我的</span>
        </Box>
      </Link>
    </Flex>
  );
}

export default Navigation;
