"use client";

import {
  createContext,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
  type Ref,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ClipContextValue = {
  registerTrigger: (index: number) => (el: HTMLElement | null) => void;
  registerItem: (index: number) => (el: HTMLElement | null) => void;
  registerBackground: (index: number) => (el: HTMLElement | null) => void;
};

const ClipContext = createContext<ClipContextValue | null>(null);

function mergeRefs<T>(...refs: Array<Ref<T> | undefined>) {
  return (value: T | null) => {
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === "function") {
        ref(value);
        return;
      }
      (ref as { current: T | null }).current = value;
    });
  };
}

type CommonProjectsClipProps = {
  children: ReactNode;
} & ComponentPropsWithoutRef<"div">;

export default function CommonProjectsClip({
  children,
  ...rest
}: CommonProjectsClipProps) {
  const triggerRefs = useRef<Array<HTMLElement | null>>([]);
  const itemRefs = useRef<Array<HTMLElement | null>>([]);
  const backgroundRefs = useRef<Array<HTMLElement | null>>([]);

  const registerTrigger = useMemo(
    () => (index: number) => (el: HTMLElement | null) => {
      triggerRefs.current[index] = el;
    },
    [],
  );
  const registerItem = useMemo(
    () => (index: number) => (el: HTMLElement | null) => {
      itemRefs.current[index] = el;
    },
    [],
  );
  const registerBackground = useMemo(
    () => (index: number) => (el: HTMLElement | null) => {
      backgroundRefs.current[index] = el;
    },
    [],
  );

  useLayoutEffect(() => {
    const triggers = triggerRefs.current.filter(
      (el): el is HTMLElement => Boolean(el && el.isConnected),
    );
    const items = itemRefs.current.filter(
      (el): el is HTMLElement => Boolean(el && el.isConnected),
    );
    if (!triggers.length || !items.length) return;

    const cleanups: Array<() => void> = [];

    triggers.forEach((trigger, index) => {
      const item = items[index];
      if (!item) return;
      const background = backgroundRefs.current[index];

      if (index === 0) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
          defaults: { ease: "none" },
        });
        tl.fromTo(
          item,
          { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" },
          { clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" },
        );
        cleanups.push(() => {
          tl.scrollTrigger?.kill();
          tl.kill();
        });
      } else if (index === items.length - 1) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
          },
          defaults: { ease: "none" },
        });
        tl.fromTo(
          item,
          { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
          { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" },
        );
        cleanups.push(() => {
          tl.scrollTrigger?.kill();
          tl.kill();
        });
      } else {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
          defaults: { ease: "none" },
        });
        tl.fromTo(
          item,
          { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
          { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" },
        );
        tl.to(item, { clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" });
        cleanups.push(() => {
          tl.scrollTrigger?.kill();
          tl.kill();
        });
      }

      if (background) {
        const bgTl = gsap.timeline({
          scrollTrigger: {
            trigger,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
          defaults: { ease: "none" },
        });
        bgTl.to(background, { yPercent: 50 });
        cleanups.push(() => {
          bgTl.scrollTrigger?.kill();
          bgTl.kill();
        });
      }
    });

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <ClipContext.Provider value={{ registerTrigger, registerItem, registerBackground }}>
      <div {...rest}>{children}</div>
    </ClipContext.Provider>
  );
}

type IndexedNodeProps<T extends ElementType = "div"> = {
  as?: T;
  index: number;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as">;

export function CommonProjectsClipTrigger<T extends ElementType = "div">({
  as,
  index,
  children,
  ...rest
}: IndexedNodeProps<T>) {
  const context = useContext(ClipContext);
  const Tag = (as ?? "div") as ElementType;
  return (
    <Tag
      {...rest}
      ref={mergeRefs(
        (rest as { ref?: Ref<HTMLElement> }).ref,
        context?.registerTrigger(index),
      )}
    >
      {children}
    </Tag>
  );
}

export function CommonProjectsClipItem<T extends ElementType = "div">({
  as,
  index,
  children,
  ...rest
}: IndexedNodeProps<T>) {
  const context = useContext(ClipContext);
  const Tag = (as ?? "div") as ElementType;
  return (
    <Tag
      {...rest}
      ref={mergeRefs(
        (rest as { ref?: Ref<HTMLElement> }).ref,
        context?.registerItem(index),
      )}
    >
      {children}
    </Tag>
  );
}

export function CommonProjectsClipBackground<T extends ElementType = "div">({
  as,
  index,
  children,
  ...rest
}: IndexedNodeProps<T>) {
  const context = useContext(ClipContext);
  const Tag = (as ?? "div") as ElementType;
  return (
    <Tag
      {...rest}
      ref={mergeRefs(
        (rest as { ref?: Ref<HTMLElement> }).ref,
        context?.registerBackground(index),
      )}
    >
      {children}
    </Tag>
  );
}
