"use client";

import Typed from "typed.js";
import {
  useLayoutEffect,
  useRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";

/** Mirrors template `mxdHeroTyped()` (Typed.js + stringsElement). */
const DEFAULT_TYPED_OPTIONS = {
  showCursor: true,
  cursorChar: "_",
  loop: true,
  typeSpeed: 70,
  backSpeed: 30,
  backDelay: 2500,
} as const;

export type CommonHeroTypedProps = {
  children: ReactNode;
  /** Passed to the outer `<h1>` (e.g. `large animated-type`). */
  className?: string;
} & Partial<{
  showCursor: boolean;
  cursorChar: string;
  loop: boolean;
  typeSpeed: number;
  backSpeed: number;
  backDelay: number;
  startDelay: number;
  smartBackspace: boolean;
  shuffle: boolean;
  loopCount: number;
  fadeOut: boolean;
  autoInsertCss: boolean;
}> &
  Omit<ComponentPropsWithoutRef<"h1">, "className" | "children">;

export default function CommonHeroTyped({
  children,
  className,
  showCursor = DEFAULT_TYPED_OPTIONS.showCursor,
  cursorChar = DEFAULT_TYPED_OPTIONS.cursorChar,
  loop = DEFAULT_TYPED_OPTIONS.loop,
  typeSpeed = DEFAULT_TYPED_OPTIONS.typeSpeed,
  backSpeed = DEFAULT_TYPED_OPTIONS.backSpeed,
  backDelay = DEFAULT_TYPED_OPTIONS.backDelay,
  startDelay,
  smartBackspace,
  shuffle,
  loopCount,
  fadeOut,
  autoInsertCss,
  ...h1Props
}: CommonHeroTypedProps) {
  const typedRef = useRef<HTMLSpanElement>(null);
  const stringsRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    let cancelled = false;
    let rafId = 0;
    let attempts = 0;
    const maxAttempts = 24;
    let typedInstance: Typed | null = null;

    const tryInit = () => {
      if (cancelled) return;
      const el = typedRef.current;
      const stringsEl = stringsRef.current;
      if (
        !el ||
        !stringsEl ||
        !el.isConnected ||
        !stringsEl.isConnected
      ) {
        if (attempts++ < maxAttempts) {
          rafId = requestAnimationFrame(tryInit);
        }
        return;
      }

      typedInstance = new Typed(el, {
        stringsElement: stringsEl,
        showCursor,
        cursorChar,
        loop,
        typeSpeed,
        backSpeed,
        backDelay,
        ...(startDelay !== undefined ? { startDelay } : {}),
        ...(smartBackspace !== undefined ? { smartBackspace } : {}),
        ...(shuffle !== undefined ? { shuffle } : {}),
        ...(loopCount !== undefined ? { loopCount } : {}),
        ...(fadeOut !== undefined ? { fadeOut } : {}),
        ...(autoInsertCss !== undefined ? { autoInsertCss } : {}),
      });
    };

    tryInit();

    return () => {
      cancelled = true;
      if (rafId) cancelAnimationFrame(rafId);
      typedInstance?.destroy();
    };
  }, [
    showCursor,
    cursorChar,
    loop,
    typeSpeed,
    backSpeed,
    backDelay,
    startDelay,
    smartBackspace,
    shuffle,
    loopCount,
    fadeOut,
    autoInsertCss,
  ]);

  return (
    <h1 className={className} {...h1Props}>
      <span ref={stringsRef} className="typed-strings" aria-hidden>
        {children}
      </span>
      <span ref={typedRef} />
    </h1>
  );
}
