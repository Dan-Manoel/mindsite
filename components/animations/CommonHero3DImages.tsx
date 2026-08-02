"use client";

import {
  cloneElement,
  createContext,
  isValidElement,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  type ElementType,
  type ComponentPropsWithoutRef,
  type ReactElement,
  type ReactNode,
  type Ref,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText.js";

gsap.registerPlugin(ScrollTrigger, SplitText);

const SCATTER_DIRECTIONS = [
  { x: 1.3, y: 0.7 },
  { x: -1.5, y: 1.0 },
  { x: 1.1, y: -1.3 },
  { x: -1.7, y: -0.8 },
  { x: 0.8, y: 1.5 },
  { x: -1.0, y: -1.4 },
  { x: 1.6, y: 0.3 },
  { x: -0.7, y: 1.7 },
  { x: 1.2, y: -1.6 },
  { x: -1.4, y: 0.9 },
  { x: 1.8, y: 0.5 },
  { x: 1.1, y: -1.8 },
  { x: 0.9, y: 1.8 },
  { x: -1.9, y: 0.4 },
  { x: 1.0, y: -1.9 },
  { x: -0.8, y: 1.9 },
  { x: 1.7, y: -1.0 },
  { x: -1.3, y: -1.2 },
  { x: 0.7, y: 2.0 },
  { x: 1.25, y: -0.2 },
];

type Hero3DContextValue = {
  registerImage: (index: number) => (el: HTMLElement | null) => void;
  registerCover: (el: HTMLElement | null) => void;
  registerIntro: (el: HTMLElement | null) => void;
  registerOutro: (el: HTMLElement | null) => void;
};

const Hero3DContext = createContext<Hero3DContextValue | null>(null);

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

type CommonHero3DImagesProps = {
  children: ReactNode;
} & ComponentPropsWithoutRef<"div">;

export default function CommonHero3DImages({
  children,
  ...rest
}: CommonHero3DImagesProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imageRefs = useRef<Array<HTMLElement | null>>([]);
  const coverRef = useRef<HTMLElement | null>(null);
  const introRef = useRef<HTMLElement | null>(null);
  const outroRef = useRef<HTMLElement | null>(null);

  const registerImage = useMemo(
    () => (index: number) => (el: HTMLElement | null) => {
      imageRefs.current[index] = el;
    },
    [],
  );
  const registerCover = useMemo(
    () => (el: HTMLElement | null) => {
      coverRef.current = el;
    },
    [],
  );
  const registerIntro = useMemo(
    () => (el: HTMLElement | null) => {
      introRef.current = el;
    },
    [],
  );
  const registerOutro = useMemo(
    () => (el: HTMLElement | null) => {
      outroRef.current = el;
    },
    [],
  );

  useLayoutEffect(() => {
    const container = containerRef.current;
    const coverImg = coverRef.current;
    const introHeader = introRef.current;
    const outroHeader = outroRef.current;
    const images = imageRefs.current.filter(
      (node): node is HTMLElement => Boolean(node && node.isConnected),
    );
    if (!container || !coverImg || !introHeader || !outroHeader || !images.length) return;

    const introHeaderSplit = SplitText.create(introHeader, { type: "words, chars" });
    const outroHeaderSplit = SplitText.create(outroHeader, { type: "words, chars" });
    gsap.set(introHeaderSplit.chars, { opacity: 1 });
    gsap.set(outroHeaderSplit.chars, { opacity: 0 });
    gsap.set(outroHeader, { opacity: 1 });

    const getRuntime = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const isMobile = screenWidth < 768;
      const scatterMultiplier = isMobile ? 2.5 : 0.5;
      const scaleMultiplier = isMobile ? 4 : 2;
      const startPositions = images.map(() => ({
        x: 0,
        y: 0,
        z: -1000,
        scale: 0,
      }));
      const endPositions = images.map((_, index) => {
        const dir = SCATTER_DIRECTIONS[index % SCATTER_DIRECTIONS.length];
        return {
          x: dir.x * screenWidth * scatterMultiplier,
          y: dir.y * screenHeight * scatterMultiplier,
          z: 2000,
          scale: 1,
        };
      });
      return { startPositions, endPositions, scaleMultiplier };
    };

    let runtime = getRuntime();
    images.forEach((img, index) => gsap.set(img, runtime.startPositions[index]));
    gsap.set(coverImg, { z: -1000, scale: 0, x: 0, y: 0 });

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: `+=${window.innerHeight * 10}px`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      invalidateOnRefresh: true,
      onRefresh: () => {
        runtime = getRuntime();
        images.forEach((img, index) => gsap.set(img, runtime.startPositions[index]));
        gsap.set(coverImg, { z: -1000, scale: 0, x: 0, y: 0 });
      },
      onUpdate: (self) => {
        const progress = self.progress;

        images.forEach((img, index) => {
          const staggerDelay = index * 0.03;
          const imageProgress = Math.max(0, (progress - staggerDelay) * 4);
          const start = runtime.startPositions[index];
          const end = runtime.endPositions[index];

          gsap.set(img, {
            z: gsap.utils.interpolate(start.z, end.z, imageProgress),
            scale: gsap.utils.interpolate(
              start.scale,
              end.scale,
              imageProgress * runtime.scaleMultiplier,
            ),
            x: gsap.utils.interpolate(start.x, end.x, imageProgress),
            y: gsap.utils.interpolate(start.y, end.y, imageProgress),
          });
        });

        const coverProgress = Math.max(0, (progress - 0.7) * 4);
        gsap.set(coverImg, {
          z: -1000 + 1000 * coverProgress,
          scale: Math.min(1, coverProgress * 2),
          x: 0,
          y: 0,
        });

        if (introHeaderSplit.chars.length > 0) {
          if (progress >= 0.6 && progress <= 0.75) {
            const introFadeProgress = (progress - 0.6) / 0.15;
            const totalChars = introHeaderSplit.chars.length;
            introHeaderSplit.chars.forEach((char, index) => {
              const charFadeProgress = index / totalChars;
              const fadeRange = 0.1;
              if (introFadeProgress >= charFadeProgress + fadeRange) {
                gsap.set(char, { opacity: 0 });
              } else if (introFadeProgress <= charFadeProgress) {
                gsap.set(char, { opacity: 1 });
              } else {
                gsap.set(char, {
                  opacity: 1 - (introFadeProgress - charFadeProgress) / fadeRange,
                });
              }
            });
          } else if (progress < 0.6) {
            gsap.set(introHeaderSplit.chars, { opacity: 1 });
          } else {
            gsap.set(introHeaderSplit.chars, { opacity: 0 });
          }
        }

        if (outroHeaderSplit.chars.length > 0) {
          if (progress >= 0.8 && progress <= 0.95) {
            const outroRevealProgress = (progress - 0.8) / 0.15;
            const totalChars = outroHeaderSplit.chars.length;
            outroHeaderSplit.chars.forEach((char, index) => {
              const charRevealProgress = index / totalChars;
              const fadeRange = 0.1;
              if (outroRevealProgress >= charRevealProgress + fadeRange) {
                gsap.set(char, { opacity: 1 });
              } else if (outroRevealProgress <= charRevealProgress) {
                gsap.set(char, { opacity: 0 });
              } else {
                gsap.set(char, {
                  opacity: (outroRevealProgress - charRevealProgress) / fadeRange,
                });
              }
            });
          } else if (progress < 0.8) {
            gsap.set(outroHeaderSplit.chars, { opacity: 0 });
          } else {
            gsap.set(outroHeaderSplit.chars, { opacity: 1 });
          }
        }
      },
    });

    return () => {
      trigger.kill();
      introHeaderSplit.revert();
      outroHeaderSplit.revert();
    };
  }, []);

  return (
    <Hero3DContext.Provider
      value={{ registerImage, registerCover, registerIntro, registerOutro }}
    >
      <div {...rest} ref={containerRef}>
        {children}
      </div>
    </Hero3DContext.Provider>
  );
}

type CommonHero3DImagesTrackProps = {
  children: ReactNode;
} & ComponentPropsWithoutRef<"div">;

export function CommonHero3DImagesTrack({
  children,
  ...rest
}: CommonHero3DImagesTrackProps) {
  return <div {...rest}>{children}</div>;
}

type CommonHero3DImageProps<T extends ElementType = "div"> = {
  as?: T;
  index: number;
} & Omit<ComponentPropsWithoutRef<T>, "as">;

export function CommonHero3DImage<T extends ElementType = "div">({
  as,
  index,
  children,
  ...rest
}: CommonHero3DImageProps<T>) {
  const context = useContext(Hero3DContext);
  const Tag = (as ?? "div") as ElementType;
  return (
    <Tag
      {...rest}
      ref={mergeRefs(
        (rest as { ref?: Ref<HTMLElement> }).ref,
        context?.registerImage(index),
      )}
    >
      {children}
    </Tag>
  );
}

type CommonHero3DCoverProps = {
  children: ReactNode;
} & ComponentPropsWithoutRef<"div">;

export function CommonHero3DCover({ children, ...rest }: CommonHero3DCoverProps) {
  const context = useContext(Hero3DContext);
  return (
    <div
      {...rest}
      ref={mergeRefs((rest as { ref?: Ref<HTMLElement> }).ref, context?.registerCover)}
    >
      {children}
    </div>
  );
}

type CommonHero3DTextProps = {
  children: ReactNode;
};

export function CommonHero3DIntroText({ children }: CommonHero3DTextProps) {
  const context = useContext(Hero3DContext);
  if (!context || !isValidElement(children)) return children;
  const element = children as ReactElement<{ ref?: Ref<HTMLElement> }>;
  return cloneElement(element, {
    ref: mergeRefs(element.props.ref, context.registerIntro),
  });
}

export function CommonHero3DOutroText({ children }: CommonHero3DTextProps) {
  const context = useContext(Hero3DContext);
  if (!context || !isValidElement(children)) return children;
  const element = children as ReactElement<{ ref?: Ref<HTMLElement> }>;
  return cloneElement(element, {
    ref: mergeRefs(element.props.ref, context.registerOutro),
  });
}
