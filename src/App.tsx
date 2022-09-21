/*
 * @Author: 王荣
 * @Date: 2022-02-11 14:25:28
 * @LastEditors: 王荣
 * @LastEditTime: 2022-09-14 00:52:55
 * @Description: 填写简介
 */

import { UseEffectDemo } from "./useEffectDemo";
import useClickOutside from "./hooks/custom-hooks/useClickOutside/useClickOutside";
import React, { useState, Fragment } from "react";
import Demo from "./demo";

const App: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      {/* <UseEffectDemo /> */}
      <button
        onClick={() => {
          setCount((state) => state + 1);
        }}
      >
        change Count
      </button>
      <Demo></Demo>
    </div>
  );
};

interface DemoProps {}
interface DemoState {
  length: number;
}

class Child extends React.Component<DemoProps, DemoState> {
  divRef: React.RefObject<HTMLDivElement>;
  constructor(props: DemoProps) {
    super(props);
    this.divRef = React.createRef();
    this.state = {
      length: 0,
    };
  }

  render(): React.ReactNode {
    return (
      <Fragment>
        <Demo></Demo>
        <button
          onClick={() => {
            // this.setState({
            //   length: this.state.length + 1,
            // })
            const Ele = document.createElement("div");
            Ele.style.height = "500px";
            Ele.style.width = "500px";
            Ele.style.background = "black";
            document
              .querySelector<HTMLElement>(".demo-class")
              ?.appendChild(Ele);
            console.log(
              "height dom",
              document.querySelector<HTMLElement>(".demo-class")?.offsetHeight
            );
            console.log(
              "height dom",
              document.querySelector<HTMLElement>(".demo-class div")?.style
                .background
            );

            for (let i = 0; i < 50000; i++) {
              console.log("true");
            }
          }}
        >
          修改宽度
        </button>
        <div
          ref={this.divRef}
          className="demo-class"
          style={{ height: "10000px" }}
        >
          {Array(this.state.length)
            .fill(0)
            .map(() => {
              return (
                <div
                  style={{
                    background: "black",
                    width: "100px",
                    height: "100px",
                  }}
                ></div>
              );
            })}
        </div>
      </Fragment>
    );
  }

  componentDidMount() {
    let time = performance.now();
    // window.addEventListener('scroll', ()=>{
    //   requestAnimationFrame(()=>{
    //     const now = performance.now();
    //     console.log('scroll', now - time)
    //     time = now
    //   })
    //   // const now = performance.now();
    //   // console.log('scroll', now - time)
    //   // time = now
    // })
  }

  componentDidUpdate() {
    console.log("height", this.divRef.current?.getBoundingClientRect().height);
    console.log(
      "height dom",
      document.querySelector<HTMLElement>(".demo-class")?.offsetHeight
    );
  }
}

export default App;
