/*
 * @Author: 王荣
 * @Date: 2022-09-14 00:40:42
 * @LastEditors: 王荣
 * @LastEditTime: 2022-09-14 00:55:15
 * @Description: 填写简介
 */
import { useRef } from "react";
import useClickOutside from "./hooks/custom-hooks/useClickOutside/useClickOutside";

const Demo: React.FC = () => {
  const dadaRef = useRef<HTMLDivElement>(null);
  const didiRef = useRef<HTMLDivElement>(null);
  console.log("rerender");
  useClickOutside([dadaRef, didiRef], () => {
    console.log("click outside");
  });
  return (
    <div>
      <div ref={dadaRef}>dada</div>
      <div ref={didiRef}>didi</div>
    </div>
  );
};

export default Demo;
