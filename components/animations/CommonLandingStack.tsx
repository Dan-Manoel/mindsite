"use client";

import {
  cloneElement,
  createContext,
  isValidElement,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ComponentPropsWithoutRef,
  type ReactElement,
  type ReactNode,
  type Ref,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText.js";

gsap.registerPlugin(ScrollTrigger, SplitText);

type SplitTextInstance = InstanceType<typeof SplitText>;

type LandingStackContextValue = {
  registerCard: (index: number) => (el: HTMLElement | null) => void;
  registerWrapper: (index: number) => (el: HTMLElement | null) => void;
  registerImage: (index: number) => (el: HTMLElement | null) => void;
};

const LandingStackContext = createContext<LandingStackContextValue | null>(null);

function mergeRefs<T>(...refs: Array<Ref<T> | undefined>) {
  return (value: T | null) => {
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === "function") ref(value);
      else (ref as { current: T | null }).current = value;
    });
  };
}

function clearLineStyleProps(line: HTMLElement) {
  line.style.removeProperty("-webkit-transform");
  line.style.removeProperty("-moz-transform");
  line.style.removeProperty("-ms-transform");
  line.style.removeProperty("transform");
}

export default function CommonLandingStack({
  children,
  ...rest
}: { children: ReactNode } & ComponentPropsWithoutRef<"div">) {
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const wrapperRefs = useRef<Array<HTMLElement | null>>([]);
  const imageRefs = useRef<Array<HTMLElement | null>>([]);

  const registerCard = useMemo(
    () => (index: number) => (el: HTMLElement | null) => {
      cardRefs.current[index] = el;
    },
    [],
  );
  const registerWrapper = useMemo(
    () => (index: number) => (el: HTMLElement | null) => {
      wrapperRefs.current[index] = el;
    },
    [],
  );
  const registerImage = useMemo(
    () => (index: number) => (el: HTMLElement | null) => {
      imageRefs.current[index] = el;
    },
    [],
  );

  useEffect(() => {
    let cancelled = false;
    const cleanups: Array<() => void> = [];
    const titleSplits: SplitTextInstance[] = [];
    const descrSplits: SplitTextInstance[] = [];

    function animateContentIn(lines: HTMLElement[]) {
      gsap.to(lines, {
        y: "0%",
        duration: 0.75,
        ease: "common",
        stagger: 0.08,
        overwrite: "auto",
      });
    }

    function animateContentInSecond(linesDescr: HTMLElement[], tags: Element) {
      gsap.to(linesDescr, {
        y: "0%",
        duration: 0.75,
        ease: "common",
        stagger: 0.08,
        overwrite: "auto",
      });
      gsap.to(tags, { opacity: 1, duration: 0.75, ease: "common" });
    }

    /** When `onEnter` was skipped (e.g. land on #demo) — same band as inTitle: `start: "top 40%"` */
    function syncTitleLineY(
      cardList: HTMLElement[],
      splits: SplitTextInstance[],
    ) {
      if (!cardList.length) return;
      const vh = window.innerHeight;
      const revealY = vh * 0.4;
      cardList.forEach((card, i) => {
        const lines = splits[i]?.lines;
        if (!lines?.length) return;
        const top = card.getBoundingClientRect().top;
        if (top >= revealY) {
          gsap.set(lines, { y: "100%" });
          return;
        }
        if (gsap.isTweening(lines)) return;
        const yp = Number(gsap.getProperty(lines[0] as HTMLElement, "yPercent") ?? 0);
        if (Number.isNaN(yp) || yp > 0.1) {
          animateContentIn(lines);
        } else {
          gsap.set(lines, { y: "0%" });
        }
      });
    }

    /**
     * Descr + tags: starts `top top` — if card is on screen but lines still hidden, reveal.
     */
    function syncDescrAndTags(
      cardList: HTMLElement[],
      descrs: SplitTextInstance[],
      tags: Array<Element | null>,
    ) {
      if (!cardList.length) return;
      const vh = window.innerHeight;
      cardList.forEach((card, i) => {
        const dLines = descrs[i]?.lines;
        const tag = tags[i];
        if (!dLines?.length || !tag) return;
        const top = card.getBoundingClientRect().top;
        if (top > vh) {
          gsap.set(dLines, { y: "100%" });
          gsap.set(tag, { opacity: 0 });
          return;
        }
        if (gsap.isTweening(dLines)) return;
        const yp = Number(
          gsap.getProperty(dLines[0] as HTMLElement, "yPercent") ?? 0,
        );
        if (Number.isNaN(yp) || yp > 0.1) {
          animateContentInSecond(dLines, tag);
        } else {
          gsap.set(dLines, { y: "0%" });
          gsap.set(tag, { opacity: 1 });
        }
      });
    }

    const runSetup = () => {
      if (cancelled) return;

      const cards = cardRefs.current.filter((c): c is HTMLElement => Boolean(c));
      if (!cards.length) return;

      for (const card of cards) {
        const titleEl = card.querySelector(".demo-card__title p");
        const descrEl = card.querySelector(".demo-card__descr");
        if (!titleEl || !descrEl) return;
        if (!card.querySelector(".demo-card__tags")) return;
        titleSplits.push(
          SplitText.create(titleEl as HTMLElement, {
            type: "words, lines",
            mask: "lines",
            linesClass: "line++",
            aria: "none",
          }),
        );
        descrSplits.push(
          SplitText.create(descrEl as HTMLElement, {
            type: "words, lines",
            mask: "lines",
            linesClass: "line++",
            aria: "none",
          }),
        );
      }
      if (titleSplits.length !== cards.length) return;

      for (const split of titleSplits) {
        const lines = split.lines;
        if (!lines?.length) continue;
        lines.forEach(clearLineStyleProps);
        gsap.set(lines, { y: "100%" });
      }
      for (const split of descrSplits) {
        const lines = split.lines;
        if (!lines?.length) continue;
        lines.forEach(clearLineStyleProps);
        gsap.set(lines, { y: "100%" });
      }

      const tagsByCard: Array<Element | null> = cards.map(
        (c) => c.querySelector(".demo-card__tags"),
      );
      tagsByCard.forEach((t) => {
        if (t) gsap.set(t, { opacity: 0 });
      });

      cards.forEach((card, index) => {
        const isLast = index === cards.length - 1;
        const st = ScrollTrigger.create({
          trigger: card,
          start: "top top",
          end: isLast ? "+=100vh" : "top top",
          endTrigger: isLast ? undefined : cards[cards.length - 1],
          pin: true,
          pinSpacing: isLast,
        });
        cleanups.push(() => st.kill());
      });

      cards.forEach((card, index) => {
        if (index >= cards.length - 1) return;
        const wrapper = wrapperRefs.current[index];
        if (!wrapper) return;
        const st = ScrollTrigger.create({
          trigger: cards[index + 1],
          start: "top bottom",
          end: "top top",
          scrub: true,
          onUpdate: (self) => {
            gsap.set(wrapper, {
              scale: 1 - self.progress * 0.15,
              opacity: 1 - self.progress,
            });
          },
        });
        cleanups.push(() => st.kill());
      });

      cards.forEach((card, index) => {
        const imageContainer = imageRefs.current[index];
        const img = imageContainer?.querySelector("img");
        if (!img) return;
        gsap.set(img, { scale: 1.4 });
        const st = ScrollTrigger.create({
          trigger: card,
          start: "top bottom",
          end: "top top",
          scrub: true,
          onUpdate: (self) => {
            gsap.set(img, { scale: 1.4 - self.progress * 0.4 });
          },
        });
        cleanups.push(() => st.kill());
      });

      cards.forEach((card, cardIndex) => {
        const tSplit = titleSplits[cardIndex];
        const dSplit = descrSplits[cardIndex];
        const tag = tagsByCard[cardIndex];
        if (!tSplit?.lines?.length || !dSplit?.lines?.length || !tag) return;
        const titleLines = tSplit.lines;
        const descrLines = dSplit.lines;

        const inTitle = ScrollTrigger.create({
          trigger: card,
          start: "top 40%",
          onEnter: () => animateContentIn(titleLines),
          onLeaveBack: () => {
            gsap.to(titleLines, {
              y: "100%",
              duration: 0.5,
              ease: "common",
            });
          },
        });

        const inDescr = ScrollTrigger.create({
          trigger: card,
          start: "top top",
          onEnter: () => animateContentInSecond(descrLines, tag),
          onLeaveBack: () => {
            gsap.to(descrLines, {
              y: "100%",
              duration: 0.5,
              ease: "common",
            });
            gsap.to(tag, { opacity: 0, duration: 0.3, ease: "common" });
          },
        });
        cleanups.push(() => {
          inTitle.kill();
          inDescr.kill();
        });
      });

      const onStRefresh = () => {
        if (cancelled) return;
        const c = cardRefs.current.filter(
          (el): el is HTMLElement => Boolean(el),
        );
        if (c.length && titleSplits.length) {
          syncTitleLineY(c, titleSplits);
        }
        if (c.length && descrSplits.length) {
          const tags: Array<Element | null> = c.map(
            (el) => el.querySelector(".demo-card__tags"),
          );
          syncDescrAndTags(c, descrSplits, tags);
        }
      };
      ScrollTrigger.addEventListener("refresh", onStRefresh);
      cleanups.push(() => {
        ScrollTrigger.removeEventListener("refresh", onStRefresh);
      });
      cleanups.push(() => {
        titleSplits.forEach((s) => s.revert());
        titleSplits.length = 0;
        descrSplits.forEach((s) => s.revert());
        descrSplits.length = 0;
      });

      ScrollTrigger.refresh();
      syncTitleLineY(cards, titleSplits);
      syncDescrAndTags(
        cards,
        descrSplits,
        cards.map((el) => el.querySelector(".demo-card__tags")),
      );
      requestAnimationFrame(() => {
        if (cancelled) return;
        ScrollTrigger.refresh();
        const c2 = cardRefs.current.filter(
          (el): el is HTMLElement => Boolean(el),
        );
        if (c2.length) {
          syncTitleLineY(c2, titleSplits);
          syncDescrAndTags(
            c2,
            descrSplits,
            c2.map((el) => el.querySelector(".demo-card__tags")),
          );
        }
      });
    };

    let raf1 = 0;
    let raf2 = 0;
    document.fonts.ready.then(() => {
      if (cancelled) return;
      raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => {
          if (!cancelled) runSetup();
        });
      });
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <LandingStackContext.Provider
      value={{ registerCard, registerWrapper, registerImage }}
    >
      <div {...rest}>{children}</div>
    </LandingStackContext.Provider>
  );
}

export function CommonLandingStackCard({
  index,
  children,
}: {
  index: number;
  children: ReactNode;
}) {
  const ctx = useContext(LandingStackContext);
  if (!ctx || !isValidElement(children)) return children;
  const el = children as ReactElement<{ ref?: Ref<HTMLElement> }>;
  return cloneElement(el, { ref: mergeRefs(el.props.ref, ctx.registerCard(index)) });
}

export function CommonLandingStackWrapper({
  index,
  children,
}: {
  index: number;
  children: ReactNode;
}) {
  const ctx = useContext(LandingStackContext);
  if (!ctx || !isValidElement(children)) return children;
  const el = children as ReactElement<{ ref?: Ref<HTMLElement> }>;
  return cloneElement(el, { ref: mergeRefs(el.props.ref, ctx.registerWrapper(index)) });
}

export function CommonLandingStackImage({
  index,
  children,
}: {
  index: number;
  children: ReactNode;
}) {
  const ctx = useContext(LandingStackContext);
  if (!ctx || !isValidElement(children)) return children;
  const el = children as ReactElement<{ ref?: Ref<HTMLElement> }>;
  return cloneElement(el, { ref: mergeRefs(el.props.ref, ctx.registerImage(index)) });
}
