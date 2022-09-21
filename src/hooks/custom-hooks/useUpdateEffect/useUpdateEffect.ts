/*
 * @Author: 王荣
 * @Date: 2022-02-28 14:16:16
 * @LastEditors: 王荣
 * @LastEditTime: 2022-06-20 15:27:47
 * @Description: 填写简介
 */
import { useEffect, useLayoutEffect, useRef } from "react";
// import { effectHookType } from "../type";
type effectHookType = typeof useEffect | typeof useLayoutEffect;

export const createUpdateEffect = (hook: effectHookType): effectHookType => {
  return function (effect, deps) {
    var isMounted = useRef(false);

    // for react-refresh
    // 首次挂载时执行该effect
    hook(function () {
      // 每次新render或者组件卸载前执行清理函数，这里deps为空数组，所以只在组件卸载时执行
      return function () {
        isMounted.current = false;
      };
    }, []);
    // deps内依赖变量变化时才执行
    hook(function () {
      // 当isMounted为false说明是首次渲染，不执行effect函数，把isMounted置为true 表示第一次渲染完成 已挂载
      if (!isMounted.current) {
        isMounted.current = true;
      } else {
        // 非首次挂载，执行effect函数并return 清理函数 该清理函数在每次重新render或者卸载组件时 执行该effect前执行清理操作，符合原useEffect逻辑。
        return effect();
      }
    }, deps);
  };
};

export default createUpdateEffect(useEffect);
