"use client";

/* eslint-disable react-hooks/refs -- RefObjects passed to `ref={}`; slotters only touch refs in callbacks */
import type { MutableRefObject } from "react";
import { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AutoplayLoopVideo from "@/components/media/AutoplayLoopVideo";
import type { MenuLinkItem } from "@/types/menu";
import { homeLinks, insightLinks, pageLinks, worksLinks } from "@/data/menu";
import { useMxdMenuGsap, useMxdMenuGsapRefs } from "@/hooks/useMxdMenuGsap";
import TextScramble from "@/components/animations/TextScramble";

/** Routes not listed in pageLinks but grouped under Pages in the overlay menu */
const EXTRA_PAGES_ROUTES = ["/preview"];

function normalizePath(p: string): string {
  if (!p) return "/";
  const t = p.endsWith("/") && p.length > 1 ? p.slice(0, -1) : p;
  return t || "/";
}

function pathMatches(pathname: string, href: string): boolean {
  return normalizePath(pathname) === normalizePath(href);
}

function sectionHasActiveRoute(pathname: string, links: MenuLinkItem[]): boolean {
  return links.some((l) => pathMatches(pathname, l.href));
}

function makeSlotters<T>(
  arr: MutableRefObject<(T | null)[]>,
  len: number,
): ((el: T | null) => void)[] {
  return Array.from({ length: len }, (_, i) => (el: T | null) => {
    arr.current[i] = el;
  });
}

type NavProps = {
  navNode: HTMLElement | null;
  toggleNode: HTMLElement | null;
  hamburgerNode: HTMLElement | null;
  setNavNode: (el: HTMLElement | null) => void;
  registerMenuReset: (fn: (() => void) | null) => void;
};

export default function Nav({
  navNode,
  toggleNode,
  hamburgerNode,
  setNavNode,
  registerMenuReset,
}: NavProps) {
  const pathname = usePathname();
  const g = useMxdMenuGsapRefs();

  const homeSectionActive = sectionHasActiveRoute(pathname, homeLinks);
  const worksSectionActive = sectionHasActiveRoute(pathname, worksLinks);
  const pagesSectionActive =
    sectionHasActiveRoute(pathname, pageLinks) ||
    EXTRA_PAGES_ROUTES.some((r) => pathMatches(pathname, r));
  const insightsSectionActive = sectionHasActiveRoute(pathname, insightLinks);
  const contactSectionActive = pathMatches(pathname, "/contact");

  const renderSubmenuLinks = (links: MenuLinkItem[]) =>
    links.map((link) => (
      <li
        key={link.href}
        className={`submenu__item ${pathMatches(pathname, link.href) ? "active" : ""}`}
      >
        <Link href={link.href}>{link.label}</Link>
      </li>
    ));

  const parentItemClass = (current: boolean) =>
    `main-menu__item${current ? " main-menu__item--current" : ""}`;

  const headerSlots = useMemo(() => makeSlotters(g.headerSplitTargets, 3), [g]);
  const mainSlots = useMemo(() => makeSlotters(g.mainMenuLinkSpans, 10), [g]);
  const contactSlots = useMemo(() => makeSlotters(g.contactAnchors, 8), [g]);
  const contactRevealSlots = useMemo(
    () => makeSlotters(g.contactRevealTargets, 8),
    [g],
  );
  const footerSlots = useMemo(() => makeSlotters(g.footerSplitTargets, 4), [g]);
  const dividerSlots = useMemo(() => makeSlotters(g.dividers, 6), [g]);
  const arrowSlots = useMemo(() => makeSlotters(g.arrows, 4), [g]);
  const liSlots = useMemo(() => makeSlotters(g.menuItemLis, 5), [g]);
  const toggleSlots = useMemo(() => makeSlotters(g.menuToggles, 5), [g]);
  const submenuSlots = useMemo(() => makeSlotters(g.menuSubmenus, 5), [g]);

  useMxdMenuGsap(navNode, toggleNode, hamburgerNode, registerMenuReset, g);

  return (
    <nav className="mxd-menu mxd-menu--gsap" ref={setNavNode}>
      <div ref={g.backdrop} className="mxd-menu__backdrop" />
      {/* Menu Overlay Start */}
      <div ref={g.overlay} className="mxd-menu__overlay">
        <div
          ref={g.content}
          className="mxd-menu__content"
          data-lenis-prevent=""
        >
          {/* Menu Logo Start */}
          <div className="mxd-menu__logo">
            <Link href={`/`} className="menu-logo">
              {/* logo icon */}
              <svg
                className="menu-logo__image"
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                viewBox="0 0 42.4 36"
              >
                <path d="M25.8,13.8h2.8v5.5h-2.8v-5.5ZM13.8,16.6v2.8h2.8v-5.5h-2.8v2.8ZM32.2,0v2.8h-2.8V0h2.8ZM26.7,5.5h2.8v-2.8h-2.8v2.8ZM21.2,5.5h-5.5v2.8h11.1v-2.8h-5.5ZM12.8,2.8v2.8h2.8v-2.8h-2.8ZM10.1,0v2.8h2.8V0h-2.8ZM7.3,5.5v5.5h2.8V2.8h-2.8v2.8ZM4.5,13.8v2.8H0v2.8h2.8v2.8H0v2.8h2.8v11.1h2.8v-8.3h5.5v-2.8h-5.5v-8.3h1.9v-5.5h-2.9v2.8ZM35,5.5v-2.8h-2.8v8.3h2.8v-5.5ZM42.4,19.4v-2.8h-4.7v-5.5h-2.8v5.5h1.9v8.3h-5.5v2.8h5.5v8.3h2.8v-11.1h2.8v-2.8h-2.8v-2.8h2.8Z" />
              </svg>
              {/* logo text */}
              <div className="menu-logo__text">
                <span ref={headerSlots[0]}>MINDSITE</span>
                <span ref={headerSlots[1]}>Template</span>
              </div>
            </Link>
          </div>
          {/* Menu Logo End */}
          {/* Menu Media Start */}
          <div className="mxd-menu__media">
            <div ref={g.mediaWrapper} className="menu-media__wrapper">
              {/* <Image   alt="Image"    src="/img/gifs/dolores.gif" width="322" height="374" /> */}
              <AutoplayLoopVideo
                poster="video/900x1280_menu.webp"
                sources={[
                  { type: "video/mp4", src: "video/900x1280_menu.mp4" },
                  { type: "video/webm", src: "video/900x1280_menu.webm" },
                ]}
              />
            </div>
          </div>
          {/* Menu Media End */}
          {/* Main Navigation Start */}
          <div className="mxd-menu__navigation">
            <div className="mxd-menu__inner">
              <div className="mxd-menu__shadow shadow-top" />
              <div className="mxd-menu__caption">
                <p ref={headerSlots[2]}>
                  🦄 Design inovador
                  <br />
                  e desenvolvimento de ponta
                </p>
              </div>
              {/* left side */}
              <div className="mxd-menu__left">
                <div className="main-menu">
                  <div className="main-menu__content">
                    <ul id="main-menu" className="main-menu__accordion">
                      <li
                        ref={liSlots[0]}
                        className={parentItemClass(homeSectionActive)}
                      >
                        <div
                          ref={dividerSlots[0]}
                          className="main-menu__divider divider-top"
                        />
                        <div ref={toggleSlots[0]} className="main-menu__toggle">
                          <p className="main-menu__link">
                            <span
                              ref={mainSlots[0]}
                              className="main-menu__number"
                            >
                              / 01
                            </span>
                            <span
                              ref={mainSlots[1]}
                              className="main-menu__caption"
                            >
                              Início
                            </span>
                          </p>
                          <div ref={arrowSlots[0]} className="main-menu__arrow">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              version="1.1"
                              viewBox="0 0 18 18"
                            >
                              <path d="M10.8,0v3.6h-3.6V0h3.6ZM14.4,10.8h3.6v-3.6h-3.6v-3.6h-3.6v3.6H0v3.6h10.8v3.6h3.6v-3.6ZM10.8,14.4h-3.6v3.6h3.6v-3.6Z" />
                            </svg>
                          </div>
                        </div>
                        <ul ref={submenuSlots[0]} className="submenu">
                          {renderSubmenuLinks(homeLinks)}
                        </ul>
                        <div
                          ref={dividerSlots[1]}
                          className="main-menu__divider divider-bottom"
                        />
                      </li>
                      <li
                        ref={liSlots[1]}
                        className={parentItemClass(worksSectionActive)}
                      >
                        <div ref={toggleSlots[1]} className="main-menu__toggle">
                          <p className="main-menu__link">
                            <span
                              ref={mainSlots[2]}
                              className="main-menu__number"
                            >
                              / 02
                            </span>
                            <span
                              ref={mainSlots[3]}
                              className="main-menu__caption"
                            >
                              Trabalhos
                            </span>
                          </p>
                          <div ref={arrowSlots[1]} className="main-menu__arrow">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              version="1.1"
                              viewBox="0 0 18 18"
                            >
                              <path d="M10.8,0v3.6h-3.6V0h3.6ZM14.4,10.8h3.6v-3.6h-3.6v-3.6h-3.6v3.6H0v3.6h10.8v3.6h3.6v-3.6ZM10.8,14.4h-3.6v3.6h3.6v-3.6Z" />
                            </svg>
                          </div>
                        </div>
                        <ul ref={submenuSlots[1]} className="submenu">
                          {renderSubmenuLinks(worksLinks)}
                        </ul>
                        <div
                          ref={dividerSlots[2]}
                          className="main-menu__divider divider-bottom"
                        />
                      </li>
                      <li
                        ref={liSlots[2]}
                        className={parentItemClass(pagesSectionActive)}
                      >
                        <div ref={toggleSlots[2]} className="main-menu__toggle">
                          <p className="main-menu__link">
                            <span
                              ref={mainSlots[4]}
                              className="main-menu__number"
                            >
                              / 03
                            </span>
                            <span
                              ref={mainSlots[5]}
                              className="main-menu__caption"
                            >
                              Páginas
                            </span>
                          </p>
                          <div ref={arrowSlots[2]} className="main-menu__arrow">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              version="1.1"
                              viewBox="0 0 18 18"
                            >
                              <path d="M10.8,0v3.6h-3.6V0h3.6ZM14.4,10.8h3.6v-3.6h-3.6v-3.6h-3.6v3.6H0v3.6h10.8v3.6h3.6v-3.6ZM10.8,14.4h-3.6v3.6h3.6v-3.6Z" />
                            </svg>
                          </div>
                        </div>
                        <ul ref={submenuSlots[2]} className="submenu">
                          {renderSubmenuLinks(pageLinks)}
                        </ul>
                        <div
                          ref={dividerSlots[3]}
                          className="main-menu__divider divider-bottom"
                        />
                      </li>
                      <li
                        ref={liSlots[3]}
                        className={parentItemClass(insightsSectionActive)}
                      >
                        <div ref={toggleSlots[3]} className="main-menu__toggle">
                          <p className="main-menu__link">
                            <span
                              ref={mainSlots[6]}
                              className="main-menu__number"
                            >
                              / 04
                            </span>
                            <span
                              ref={mainSlots[7]}
                              className="main-menu__caption"
                            >
                              Artigos
                            </span>
                          </p>
                          <div ref={arrowSlots[3]} className="main-menu__arrow">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              version="1.1"
                              viewBox="0 0 18 18"
                            >
                              <path d="M10.8,0v3.6h-3.6V0h3.6ZM14.4,10.8h3.6v-3.6h-3.6v-3.6h-3.6v3.6H0v3.6h10.8v3.6h3.6v-3.6ZM10.8,14.4h-3.6v3.6h3.6v-3.6Z" />
                            </svg>
                          </div>
                        </div>
                        <ul ref={submenuSlots[3]} className="submenu">
                          {renderSubmenuLinks(insightLinks)}
                        </ul>
                        <div
                          ref={dividerSlots[4]}
                          className="main-menu__divider divider-bottom"
                        />
                      </li>
                      <li
                        ref={liSlots[4]}
                        className={parentItemClass(contactSectionActive)}
                      >
                        <div ref={toggleSlots[4]} className="main-menu__toggle">
                          <Link className="main-menu__link" href={`/contact`}>
                            <span
                              ref={mainSlots[8]}
                              className="main-menu__number"
                            >
                              / 05
                            </span>
                            <span
                              ref={mainSlots[9]}
                              className="main-menu__caption"
                            >
                              Contato
                            </span>
                          </Link>
                        </div>
                        <div
                          ref={dividerSlots[5]}
                          className="main-menu__divider divider-bottom"
                        />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* right side */}
              <div className="mxd-menu__right">
                <div className="menu-contact">
                  <div className="menu-contact__item">
                    <ul className="menu-contact__list">
                      <li>
                        <a
                          ref={contactSlots[0]}
                          className="tag tag-m"
                          href="mailto:ola@mindsite.com.br?subject=Message%20from%20your%20site"
                        >
                          <TextScramble
                            ref={contactRevealSlots[0]}
                            className="mxd-scramble"
                          >
                            ola@mindsite.com.br
                          </TextScramble>
                        </a>
                      </li>
                      <li>
                        <a
                          ref={contactSlots[1]}
                          className="tag tag-m"
                          href="tel:+12127089400"
                        >
                          <TextScramble
                            ref={contactRevealSlots[1]}
                            className="mxd-scramble"
                          >
                            +55 11 947675814
                          </TextScramble>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="menu-contact__item">
                    <ul className="menu-contact__list">
                      <li>
                        <a
                          ref={contactSlots[2]}
                          className="tag tag-m"
                          href="https://goo.gl/maps/nWXKpGaDPuyH6gxRA"
                          target="_blank"
                        >
                          <span ref={contactRevealSlots[2]}>
                            Av. Paulista, 1000,
                            <br />
                            São Paulo, SP
                            <br />
                            Brasil
                          </span>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="menu-contact__item">
                    <ul className="menu-contact__list">
                      <li>
                        <a
                          ref={contactSlots[3]}
                          className="tag tag-m"
                          href="https://dribbble.com/"
                          target="_blank"
                        >
                          <TextScramble
                            ref={contactRevealSlots[3]}
                            className="mxd-scramble"
                          >
                            Dribbble
                          </TextScramble>
                        </a>
                      </li>
                      <li>
                        <a
                          ref={contactSlots[4]}
                          className="tag tag-m"
                          href="https://www.behance.net/"
                          target="_blank"
                        >
                          <TextScramble
                            ref={contactRevealSlots[4]}
                            className="mxd-scramble"
                          >
                            Behance
                          </TextScramble>
                        </a>
                      </li>
                      <li>
                        <a
                          ref={contactSlots[5]}
                          className="tag tag-m"
                          href="https://github.com/"
                          target="_blank"
                        >
                          <TextScramble
                            ref={contactRevealSlots[5]}
                            className="mxd-scramble"
                          >
                            Github
                          </TextScramble>
                        </a>
                      </li>
                      <li>
                        <a
                          ref={contactSlots[6]}
                          className="tag tag-m"
                          href="https://www.figma.com/community"
                          target="_blank"
                        >
                          <TextScramble
                            ref={contactRevealSlots[6]}
                            className="mxd-scramble"
                          >
                            Figma Community
                          </TextScramble>
                        </a>
                      </li>
                      <li>
                        <a
                          ref={contactSlots[7]}
                          className="tag tag-m"
                          href="https://codepen.io/"
                          target="_blank"
                        >
                          <TextScramble
                            ref={contactRevealSlots[7]}
                            className="mxd-scramble"
                          >
                            Codepen
                          </TextScramble>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* data bottom line */}
              <div className="mxd-menu__shadow" />
              <div className="mxd-menu__data">
                <div className="menu-data__left">
                  <p ref={footerSlots[0]} className="menu-data__text">
                    Feito com{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      version="1.1"
                      viewBox="0 0 18 18"
                    >
                      <path d="M2.6,6.4v2.6H0V3.9h2.6v2.6ZM15.4,3.9v5.1h2.6V3.9h-2.6ZM12.9,11.6h2.6v-2.6h-2.6v2.6ZM2.6,9v2.6h2.6v-2.6h-2.6ZM10.3,14.1h2.6v-2.6h-2.6v2.6ZM5.1,11.6v2.6h2.6v-2.6h-2.6ZM7.7,3.9V1.3H2.6v2.6h5.1ZM15.4,3.9V1.3h-5.1v2.6h5.1ZM10.3,6.4v-2.6h-2.6v2.6h2.6ZM7.7,16.7h2.6v-2.6h-2.6v2.6Z" />
                    </svg>{" "}
                    {/* <i class="ph-fill ph-heart t-additional"></i> */}
                    por{" "}
                    <a
                      ref={footerSlots[1]}
                      href="https://themeforest.net/user/ib-themes"
                      target="_blank"
                    >
                      <TextScramble className="mxd-scramble">
                        IB Themes
                      </TextScramble>
                    </a>
                  </p>
                </div>
                <div className="menu-data__right">
                  <p ref={footerSlots[2]} className="menu-data__text">
                    Todos os direitos reservados - MINDSITE
                  </p>
                  <p ref={footerSlots[3]} className="menu-data__text">
                    ©{new Date().getFullYear()}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Main Navigation End */}
        </div>
      </div>
      {/* Menu Overlay End */}
    </nav>
  );
}
