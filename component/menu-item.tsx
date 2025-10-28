"use client";

import { CSSProperties, RefObject, useContext, useEffect, useRef } from "react";
import { menuItems } from "@/data/menu-data";
import { useState } from "react";
import { useAppContext } from "./context";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { inverseLerp, lerp, setVhVariable } from "@/helper/helper";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MOBILE_BREAKPOINT } from "./subpage-list";

type MenuItemProps = {
  index: number;
  title: string;
  description: string;
  slug: string;
};

enum MenuState {
    Init,
    Opening,
    Open,
    Closing,
    Closed
}

export { MenuState }

export default function MenuItem({ index, title, description, slug }: MenuItemProps) {

    const shapeRef = useRef<HTMLDivElement>(null);
    const descriptionRef = useRef<HTMLDivElement>(null);
    const mouseMoveContainerRef = useRef<HTMLDivElement>(null);
    const transitionContainerRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const searchParams = useSearchParams();
    const selectedSlug = searchParams.get("item");
    const path = usePathname();
    const [isMobile, setIsMobile] = useState(false);

    const { 
        selectedPageIndex, 
        setSelectedPageIndex, 
        previousSelectedPageIndex,
        setPreviousSelectedPageIndex,
        menuState, 
        setMenuState
    } = useAppContext()

    function handleClick(){

        if (selectedSlug && window.innerWidth < MOBILE_BREAKPOINT) {
          router.push("?");
          return;
        }

        let prev = selectedPageIndex
        let current = selectedPageIndex === index ? null : index;

        setPreviousSelectedPageIndex(prev);
        setSelectedPageIndex(current)

        if (current === null && prev === null) {
          console.log("init");
        //   setMenuState(MenuState.Init);
        } else if (current !== null && prev === null) {
          console.log("close");
          setMenuState(MenuState.Closing);
        } else if (current === null && prev !== null) {
          console.log("open");
          setMenuState(MenuState.Opening);
        } else {
          console.error(
            "Unhandled menu state. Current: " + current + ", prev: " + prev
          );
        }
    }


    useEffect(() => {

        // Mouse motion effect
        const handleMouseMove = (e: MouseEvent) => {
            // if (isMobile) return;
            if (!shapeRef.current) return;
            if (!mouseMoveContainerRef.current) return;

            const rect = shapeRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const dx = e.clientX - centerX;
            const dy = e.clientY - centerY;
            const mouseDistance = Math.sqrt(dx * dx + dy * dy);

            const maxOffset = 10;
            const maxDistanceToTrigger = 300;
            const minDistanceToTrigger = 100;
            let weight = inverseLerp(maxDistanceToTrigger, minDistanceToTrigger, mouseDistance);
            const moveX = lerp(0, maxOffset, weight);
            setMouseMoveRefTranslateX(moveX);
        };

        const handleResize = () => {
            setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
            setVhVariable();
            choreograph();
        }

        handleResize();

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("resize", handleResize);

        

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", handleResize);
        }
    });

    useEffect(() => {
      // menu-wide animations
      choreograph();
    }, [menuState]);

    return (
      <div style={styles.container} ref={transitionContainerRef}>
        <div ref={mouseMoveContainerRef} style={styles.mouseMove}>
          <div style={styles.shape} onClick={handleClick} ref={shapeRef}></div>
          <div
            style={{
              ...(isMobile &&
              selectedPageIndex == index &&
              menuState == MenuState.Closed
                ? styles.mobileText
                : styles.text),
            }}
          >
            <p onClick={handleClick} style={styles.name}>
              {title}
            </p>
            <p ref={descriptionRef} style={styles.description}>
              {description}{" "}
            </p>
          </div>
        </div>
      </div>
    );

    function setMouseMoveRefTranslateX(moveX: number) {
        if (!mouseMoveContainerRef.current) return;
        gsap.to(mouseMoveContainerRef.current, {
            x: moveX,
            duration: 0.1
        });
    }

    function computeInitChoreoDuration(index: number) {
      return index * 0.175 + 0.5;
    }

    function computeOpenXDestination(index: number) {
      const vh = window.innerHeight / 100;

      const numTiles = 4;
      const tileWidth = 25 * vh;
      const maxPadding = 100;
      const maxCascade = 300;

      const maxStep = maxCascade / (numTiles - 1);
      const cascadeWidth = maxStep * (numTiles - 1);
      const totalWidth = tileWidth + cascadeWidth + 2 * maxPadding;

      let padding: number;
      let step: number;

      if (totalWidth <= window.innerWidth) {
        padding = maxPadding;
        step = maxStep;
      } else {
        const denominator = maxCascade + 2 * maxPadding;
        const s = (window.innerWidth - tileWidth) / denominator;
        padding = maxPadding * s;
        step = maxStep * s;
      }

      const output = padding + index * step + 100 * vh;
      return output;
    }

    function computeClosedXDestination() {
        const vh = window.innerHeight / 100;
        const output = 103 * vh;
        return output;
    }

    function computeClosedYDestination() {
        const vh = window.innerHeight / 100;
        const output = 3 * vh;
        return output;
    }

    function computeClosedHeight() {
      return window.innerWidth < MOBILE_BREAKPOINT ? "10%" : "15%"
    }

    function choreograph() {
    
        switch (menuState) {
          case MenuState.Init: {
            console.log("choreo init");
            choreographInit();
            break;
          }
          case MenuState.Opening: {
            console.log("choreo open");
            choreographOpening();
            break;
          }
          case MenuState.Closing: {
            console.log("choreo close");
            choreographClose();
            break;
          }
          case MenuState.Closed: {
            console.log("choreo closed");
            choreographClosed();
            break;
          }
          case MenuState.Open: {
            console.log("choreo closed");
            choreographOpen();
            break;
          }
        }
    }

    function choreographInit() {
        gsap.set(transitionContainerRef.current, {
          opacity: 1,
          y: 0,
        });
        gsap.to(transitionContainerRef.current, {
          x: computeOpenXDestination(index),
          y: 0,
          opacity: 1,
          duration: computeInitChoreoDuration(index),
          onComplete: () => {
            if (index === 3) setMenuState(MenuState.Open);
          }
        });
    }

    function choreographOpening() {

        const scaleDuration = 0.1;
        const xCloseDuration = 0.3;

        let tl = gsap.timeline();
        gsap.to(mouseMoveContainerRef.current, {
          x: 0,
        });
        gsap.to(descriptionRef.current, {
          opacity: 1,
          duration: 0.1,
        });
        if (previousSelectedPageIndex === index) {
          tl.to(transitionContainerRef.current, {
            duration: xCloseDuration,
            y: 0,
            height: "25%",
          }).to(transitionContainerRef.current, {
            x: computeOpenXDestination(index),
            opacity: 1,
            duration: xCloseDuration,
          });
        } else {
          tl.to(transitionContainerRef.current, {
            height: "25%",
            opacity: 0,
            duration: xCloseDuration,
            x: computeOpenXDestination(index),
          }).to(transitionContainerRef.current, {
            scale: 1,
            opacity: 1,
            duration: scaleDuration,
            onComplete: () => {
              router.push("/");
              setMenuState(MenuState.Open)
            },
          });
        }
    }



    function choreographClose() {

        const scaleDuration = 0.1;
        const xCloseDuration = 0.3;

        let tl = gsap.timeline()
        if (selectedPageIndex === index) {
            gsap.to(mouseMoveContainerRef.current, {
                x: 0,
            });
            gsap.to(descriptionRef.current, {
              opacity: 0,
              duration: 0.1,
            });
            tl.to(
              transitionContainerRef.current,
              {
                x: computeClosedXDestination(),
                opacity: 1,
                duration: xCloseDuration,
            },
            "+=" + scaleDuration.toString()
        ).to(transitionContainerRef.current, {
            height: computeClosedHeight(),
              y: computeClosedYDestination(),
              onComplete: () => {
                router.push(slug);
                setMenuState(MenuState.Closed);
              },
            });
        } else {
            tl.to(transitionContainerRef.current, {
              scale: 0.9,
              opacity: 0,
              duration: scaleDuration,
            }).to(
              transitionContainerRef.current,
              {
                height: 0,
                opacity: 0,
                duration: xCloseDuration,
                x: computeClosedXDestination(),
                y: 0,
              },
              "+=0.4"
            );
        }
    }

        function choreographClosed() {

          if (selectedPageIndex === index) {
            gsap.set(mouseMoveContainerRef.current, {
              x: 0,
            });
            gsap.to(descriptionRef.current, {
              opacity: 1,
              duration: 0.1,
            });
            gsap.set(transitionContainerRef.current, {
              x: computeClosedXDestination(),
              opacity: 1,
              y: computeClosedYDestination(),
              // duration: 0.1,
              height: computeClosedHeight(),
            });

          } else {
            gsap.set(transitionContainerRef.current, {
              height: 0,
              opacity: 0,
              x: computeClosedXDestination(),
              y: 0,
              duration: 0.1,
            });
          }
        }


    function choreographOpen() {
        gsap.to(descriptionRef.current, {
          opacity: 1,
          duration: 0.1,
        });
        gsap.set(transitionContainerRef.current, {
          height: "25%",
          opacity: 1,
          scale: 1,
          x: computeOpenXDestination(index),
          y: 0,
        //   duration: 0.1,
        });
    }
}

const styles: {
  shape: CSSProperties;
  container: CSSProperties;
  text: CSSProperties;
  mobileText: CSSProperties;
  mouseMove: CSSProperties;
  name: CSSProperties;
  description: CSSProperties;
} = {
  container: {
    height: "25%",
    width: "80vw",
    display: "flex",
    flexDirection: "row",
    marginLeft: "calc(var(--vh, 1vh) * -100)",
  },
  shape: {
    width: "calc(var(--vh, 1vh) * 15)",
    height: "100%",
    background: "var(--brand-color)",
    cursor: "pointer",
  },
  text: {
    paddingTop: "10px",
    paddingLeft: "10px",
    maxWidth: "10%",
  },
  mobileText: {
    paddingTop: "10px",
    paddingLeft: "10px",
    width: "fit-content"
  },
  name: {
    color: "white",
    cursor: "pointer",
  },
  description: {
    color: "gray",
    fontSize: "0.8rem",
  },

  mouseMove: {
    width: "100%",
    // background: "blue",
    zIndex: "10",
    display: "flex",
    flexDirection: "row",
  },
};

