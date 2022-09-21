/*
 * @Author: 王荣
 * @Date: 2022-06-08 13:38:31
 * @LastEditors: 王荣
 * @LastEditTime: 2022-09-14 00:49:49
 * @Description: 填写简介
 */
import { RefObject, useEffect, useMemo, useRef } from "react";

function useClickOutside(
  watchRef: RefObject<HTMLElement> | RefObject<HTMLElement>[],
  handler: Function
) {
  const handlerRef = useRef<Function>(handler);
  handlerRef.current = useMemo(() => handler, [handler]);

  useEffect(() => {
    console.log("useEffect");
    const listener = (event: MouseEvent) => {
      let isClickWatchingDOM: boolean;
      if (Array.isArray(watchRef)) {
        console.log("isArray");
        isClickWatchingDOM =
          watchRef.length > 0 &&
          watchRef.some((refDOM) => {
            return refDOM.current?.contains(event.target as HTMLElement);
          });
        console.log("isArrayisClickWatchingDOM", isClickWatchingDOM);
      } else {
        console.log("isSingle");
        isClickWatchingDOM =
          !watchRef.current ||
          watchRef.current.contains(event.target as HTMLElement);
        console.log("isSingleisClickWatchingDOM", isClickWatchingDOM);
      }
      if (isClickWatchingDOM) {
        return;
      }
      handlerRef.current(event);
    };

    document.addEventListener("click", listener);

    return () => {
      document.removeEventListener("click", listener);
    };
  }, [watchRef]);
}

export default useClickOutside;
