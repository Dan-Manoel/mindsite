"use client";
import Link from "next/link";
import Image from "next/image";
import AutoplayLoopVideo from "@/components/media/AutoplayLoopVideo";
import CommonLoadAnimation, {
  CommonLoadFade,
  CommonLoadItem,
} from "@/components/animations/CommonLoadAnimation";
import TextScramble from "@/components/animations/TextScramble";
import SmoothAnchorLink from "@/components/common/SmoothAnchorLink";
import CommonHero3DImages, {
  CommonHero3DCover,
  CommonHero3DImage,
  CommonHero3DImagesTrack,
  CommonHero3DIntroText,
  CommonHero3DOutroText,
} from "@/components/animations/CommonHero3DImages";
export default function Hero() {
  return (
    <CommonLoadAnimation>
      <>
        <div className="mxd-section mxd-hero-section no-padding loading-wrap">
          <CommonHero3DImages className="mxd-hero-02">
            {/* background group */}
            <div className="mxd-hero-02__background">
              <AutoplayLoopVideo
                poster="video/1280x720_hero-02.webp"
                sources={[
                  { src: "video/1280x720_hero-02.mp4", type: "video/mp4" },
                  { src: "video/1280x720_hero-02.webm", type: "video/webm" },
                ]}
              />
              <div className="mxd-hero-02__cover" />
            </div>
            {/* scroll images */}
            <CommonHero3DImagesTrack className="mxd-hero-02__images">
              <CommonHero3DImage
                as={Link}
                index={0}
                className="hero-02__img"
                href={`/project-details`}
              >
                <Image
                  alt="Azurio Template Sample Image"
                  src="/img/hero/hero-03_1.webp"
                  width={1280}
                  height={800}
                />
              </CommonHero3DImage>
              <CommonHero3DImage index={1} className="hero-02__img">
                <Image
                  alt="Azurio Template Sample Image"
                  src="/img/hero/hero-03_2.webp"
                  width={1280}
                  height={800}
                />
              </CommonHero3DImage>
              <CommonHero3DImage index={2} className="hero-02__img">
                <Image
                  alt="Azurio Template Sample Image"
                  src="/img/hero/hero-03_3.webp"
                  width={1280}
                  height={800}
                />
              </CommonHero3DImage>
              <CommonHero3DImage index={3} className="hero-02__img">
                <Image
                  alt="Azurio Template Sample Image"
                  src="/img/hero/hero-03_4.webp"
                  width={1280}
                  height={800}
                />
              </CommonHero3DImage>
              <CommonHero3DImage index={4} className="hero-02__img">
                <Image
                  alt="Azurio Template Sample Image"
                  src="/img/hero/hero-03_5.webp"
                  width={1280}
                  height={800}
                />
              </CommonHero3DImage>
              <CommonHero3DImage index={5} className="hero-02__img">
                <Image
                  alt="Azurio Template Sample Image"
                  src="/img/hero/hero-03_6.webp"
                  width={1280}
                  height={800}
                />
              </CommonHero3DImage>
              <CommonHero3DImage index={6} className="hero-02__img">
                <Image
                  alt="Azurio Template Sample Image"
                  src="/img/hero/hero-03_7.webp"
                  width={1280}
                  height={800}
                />
              </CommonHero3DImage>
              <CommonHero3DImage index={7} className="hero-02__img">
                <Image
                  alt="Azurio Template Sample Image"
                  src="/img/hero/hero-03_8.webp"
                  width={1280}
                  height={800}
                />
              </CommonHero3DImage>
              <CommonHero3DImage index={8} className="hero-02__img">
                <Image
                  alt="Azurio Template Sample Image"
                  src="/img/hero/hero-03_9.webp"
                  width={1280}
                  height={800}
                />
              </CommonHero3DImage>
              <CommonHero3DImage index={9} className="hero-02__img">
                <Image
                  alt="Azurio Template Sample Image"
                  src="/img/hero/hero-03_10.webp"
                  width={1280}
                  height={800}
                />
              </CommonHero3DImage>
              <CommonHero3DImage index={10} className="hero-02__img">
                <Image
                  alt="Azurio Template Sample Image"
                  src="/img/hero/hero-03_11.webp"
                  width={1280}
                  height={800}
                />
              </CommonHero3DImage>
              <CommonHero3DImage index={11} className="hero-02__img">
                <Image
                  alt="Azurio Template Sample Image"
                  src="/img/hero/hero-03_12.webp"
                  width={1280}
                  height={800}
                />
              </CommonHero3DImage>
              <CommonHero3DImage index={12} className="hero-02__img">
                <Image
                  alt="Azurio Template Sample Image"
                  src="/img/hero/hero-03_13.webp"
                  width={1280}
                  height={800}
                />
              </CommonHero3DImage>
              <CommonHero3DImage index={13} className="hero-02__img">
                <Image
                  alt="Azurio Template Sample Image"
                  src="/img/hero/hero-03_14.webp"
                  width={1280}
                  height={800}
                />
              </CommonHero3DImage>
              <CommonHero3DImage index={14} className="hero-02__img">
                <Image
                  alt="Azurio Template Sample Image"
                  src="/img/hero/hero-03_15.webp"
                  width={1280}
                  height={800}
                />
              </CommonHero3DImage>
              <CommonHero3DImage index={15} className="hero-02__img">
                <Image
                  alt="Azurio Template Sample Image"
                  src="/img/hero/hero-03_16.webp"
                  width={1280}
                  height={800}
                />
              </CommonHero3DImage>
              <CommonHero3DImage index={16} className="hero-02__img">
                <Image
                  alt="Azurio Template Sample Image"
                  src="/img/hero/hero-03_17.webp"
                  width={1280}
                  height={800}
                />
              </CommonHero3DImage>
              <CommonHero3DImage index={17} className="hero-02__img">
                <Image
                  alt="Azurio Template Sample Image"
                  src="/img/hero/hero-03_18.webp"
                  width={1280}
                  height={800}
                />
              </CommonHero3DImage>
              <CommonHero3DImage index={18} className="hero-02__img">
                <Image
                  alt="Azurio Template Sample Image"
                  src="/img/hero/hero-03_19.webp"
                  width={1280}
                  height={800}
                />
              </CommonHero3DImage>
              <CommonHero3DImage index={19} className="hero-02__img">
                <Image
                  alt="Azurio Template Sample Image"
                  src="/img/hero/hero-03_20.webp"
                  width={1280}
                  height={800}
                />
              </CommonHero3DImage>
            </CommonHero3DImagesTrack>
            {/* bottom group */}
            <div className="mxd-hero-02__bottom">
              <div className="mxd-hero-02__dataline">
                <div className="mxd-hero-02__socials mxd-grid-item">
                  <ul className="mxd-socials-line">
                    <li>
                      <CommonLoadItem index={0}>
                        <a
                          className="mxd-socials-line__link permanent loading-item"
                          href="https://dribbble.com/"
                          target="_blank"
                        >
                          <TextScramble className="mxd-scramble">
                            Dribbble
                          </TextScramble>
                        </a>
                      </CommonLoadItem>
                    </li>
                    <li>
                      <CommonLoadItem index={1}>
                        <a
                          className="mxd-socials-line__link permanent loading-item"
                          href="https://www.behance.net/"
                          target="_blank"
                        >
                          <TextScramble className="mxd-scramble">
                            Behance
                          </TextScramble>
                        </a>
                      </CommonLoadItem>
                    </li>
                    <li>
                      <CommonLoadItem index={2}>
                        <a
                          className="mxd-socials-line__link permanent loading-item"
                          href="https://github.com/"
                          target="_blank"
                        >
                          <TextScramble className="mxd-scramble">
                            Github
                          </TextScramble>
                        </a>
                      </CommonLoadItem>
                    </li>
                    <li>
                      <CommonLoadItem index={3}>
                        <a
                          className="mxd-socials-line__link permanent loading-item"
                          href="https://codepen.io/"
                          target="_blank"
                        >
                          <TextScramble className="mxd-scramble">
                            Codepen
                          </TextScramble>
                        </a>
                      </CommonLoadItem>
                    </li>
                    <li>
                      <CommonLoadItem index={4}>
                        <a
                          className="mxd-socials-line__link permanent loading-item"
                          href="https://www.figma.com/community"
                          target="_blank"
                        >
                          <TextScramble className="mxd-scramble">
                            Figma Community
                          </TextScramble>
                        </a>
                      </CommonLoadItem>
                    </li>
                  </ul>
                </div>
                <CommonLoadFade index={0}>
                  <div className="mxd-hero-02__controls mxd-grid-item loading-fade">
                    <SmoothAnchorLink
                      className="btn btn-line-icon btn-line-permanent slide-down"
                      targetId="about"
                    >
                      <TextScramble className="btn-caption mxd-scramble">
                        Scroll to explore
                      </TextScramble>
                      <i>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          version="1.1"
                          viewBox="0 0 18 18"
                        >
                          <path d="M18,10.8h-3.6v-3.6h3.6v3.6ZM7.2,14.4v3.6h3.6v-3.6h3.6v-3.6h-3.6V0h-3.6v10.8h-3.6v3.6s3.6,0,3.6,0ZM3.6,10.8v-3.6H0v3.6h3.6Z" />
                        </svg>
                      </i>
                    </SmoothAnchorLink>
                  </div>
                </CommonLoadFade>
              </div>
            </div>
            {/* cover image */}
            <CommonHero3DCover className="mxd-hero-02__cover-img">
              <Image
                alt="Azurio Template Sample Image"
                src="/img/hero/hero-03_cover.webp"
                width={1920}
                height={1200}
                priority
              />
            </CommonHero3DCover>
            {/* headlines */}
            <div className="mxd-hero-02__intro">
              <CommonHero3DIntroText>
                <h1 className="medium permanent">
                  Design, tech &amp; some magic
                </h1>
              </CommonHero3DIntroText>
            </div>
            <div className="mxd-hero-02__outro">
              <CommonHero3DOutroText>
                <p>Ready for the game changing project?</p>
              </CommonHero3DOutroText>
            </div>
          </CommonHero3DImages>
        </div>
      </>
    </CommonLoadAnimation>
  );
}
