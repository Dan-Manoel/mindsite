import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import { CommonScrollAnimated } from "@/components/animations/CommonScrollAnimated";
export default function Socials() {
  return (
    <>
      <div className="mxd-section bg-color-accent padding-top-title padding-bottom-default">
        <div className="mxd-container grid-l-container">
          {/* Block - Section Title & Socials Start */}
          <div className="mxd-block">
            <div className="container-fluid p-0">
              <div className="row g-0">
                <div className="col-12 col-xl-6 mxd-grid-item">
                  {/* section title */}
                  <div className="mxd-section-title">
                    <div className="mxd-section-title__title pre-grid-split-xl">
                      <CommonAnimatedText
                        as="h2"
                        className="mxd-split-lines accent"
                        animation="splitLines"
                      >
                        Conecte-se
                      </CommonAnimatedText>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-xl-6 mxd-grid-item">
                  {/* socials list */}
                  <div className="mxd-socials-list">
                    {/* socials item */}
                    <a
                      className="socials-list__item no-margin slide-right-up"
                      href="https://dribbble.com/"
                      target="_blank"
                    >
                      <CommonScrollAnimated
                        className="socials-list__divider accent divider-top anim-uni-clip-in"
                        as="div"
                        animation="clipIn"
                      />
                      <div className="socials-list__info">
                        <CommonScrollAnimated
                          className="socials-list__number accent anim-uni-slide-down"
                          as="div"
                          animation="slideDownLine"
                        >
                          <span>[01]</span>
                        </CommonScrollAnimated>
                        <CommonScrollAnimated
                          className="socials-list__name accent anim-uni-slide-down"
                          as="div"
                          animation="slideDownLine"
                        >
                          <span>Dribbble</span>
                        </CommonScrollAnimated>
                      </div>
                      <CommonScrollAnimated
                        className="socials-list__arrow accent anim-uni-slide-down"
                        as="div"
                        animation="slideDownLine"
                      >
                        <i>
                          <svg
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            x="0px"
                            y="0px"
                            viewBox="0 0 18 18"
                            enableBackground="new 0 0 18 18"
                            xmlSpace="preserve"
                          >
                            <path
                              d="M18,0v14.4h-3.6V7.2h-3.6V3.6H3.6V0H18z M7.2,10.8h3.6V7.2H7.2C7.2,7.2,7.2,10.8,7.2,10.8z M3.6,14.4h3.6v-3.6H3.6V14.4z
                            M0,18h3.6v-3.6H0V18z"
                            />
                          </svg>
                        </i>
                      </CommonScrollAnimated>
                      <CommonScrollAnimated
                        className="socials-list__divider accent divider-bottom anim-uni-clip-in"
                        as="div"
                        animation="clipIn"
                      />
                    </a>
                    {/* socials item */}
                    <a
                      className="socials-list__item slide-right-up"
                      href="https://www.behance.net/"
                      target="_blank"
                    >
                      <CommonScrollAnimated
                        className="socials-list__divider accent divider-top anim-uni-clip-in"
                        as="div"
                        animation="clipIn"
                      />
                      <div className="socials-list__info">
                        <CommonScrollAnimated
                          className="socials-list__number accent anim-uni-slide-down"
                          as="div"
                          animation="slideDownLine"
                        >
                          <span>[02]</span>
                        </CommonScrollAnimated>
                        <CommonScrollAnimated
                          className="socials-list__name accent anim-uni-slide-down"
                          as="div"
                          animation="slideDownLine"
                        >
                          <span>Behance</span>
                        </CommonScrollAnimated>
                      </div>
                      <CommonScrollAnimated
                        className="socials-list__arrow accent anim-uni-slide-down"
                        as="div"
                        animation="slideDownLine"
                      >
                        <i>
                          <svg
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            x="0px"
                            y="0px"
                            viewBox="0 0 18 18"
                            enableBackground="new 0 0 18 18"
                            xmlSpace="preserve"
                          >
                            <path
                              d="M18,0v14.4h-3.6V7.2h-3.6V3.6H3.6V0H18z M7.2,10.8h3.6V7.2H7.2C7.2,7.2,7.2,10.8,7.2,10.8z M3.6,14.4h3.6v-3.6H3.6V14.4z
                            M0,18h3.6v-3.6H0V18z"
                            />
                          </svg>
                        </i>
                      </CommonScrollAnimated>
                      <CommonScrollAnimated
                        className="socials-list__divider accent divider-bottom anim-uni-clip-in"
                        as="div"
                        animation="clipIn"
                      />
                    </a>
                    {/* socials item */}
                    <a
                      className="socials-list__item slide-right-up"
                      href="https://github.com/"
                      target="_blank"
                    >
                      <CommonScrollAnimated
                        className="socials-list__divider accent divider-top anim-uni-clip-in"
                        as="div"
                        animation="clipIn"
                      />
                      <div className="socials-list__info">
                        <CommonScrollAnimated
                          className="socials-list__number accent anim-uni-slide-down"
                          as="div"
                          animation="slideDownLine"
                        >
                          <span>[03]</span>
                        </CommonScrollAnimated>
                        <CommonScrollAnimated
                          className="socials-list__name accent anim-uni-slide-down"
                          as="div"
                          animation="slideDownLine"
                        >
                          <span>Github</span>
                        </CommonScrollAnimated>
                      </div>
                      <CommonScrollAnimated
                        className="socials-list__arrow accent anim-uni-slide-down"
                        as="div"
                        animation="slideDownLine"
                      >
                        <i>
                          <svg
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            x="0px"
                            y="0px"
                            viewBox="0 0 18 18"
                            enableBackground="new 0 0 18 18"
                            xmlSpace="preserve"
                          >
                            <path
                              d="M18,0v14.4h-3.6V7.2h-3.6V3.6H3.6V0H18z M7.2,10.8h3.6V7.2H7.2C7.2,7.2,7.2,10.8,7.2,10.8z M3.6,14.4h3.6v-3.6H3.6V14.4z
                            M0,18h3.6v-3.6H0V18z"
                            />
                          </svg>
                        </i>
                      </CommonScrollAnimated>
                      <CommonScrollAnimated
                        className="socials-list__divider accent divider-bottom anim-uni-clip-in"
                        as="div"
                        animation="clipIn"
                      />
                    </a>
                    {/* socials item */}
                    <a
                      className="socials-list__item slide-right-up"
                      href="https://codepen.io/"
                      target="_blank"
                    >
                      <CommonScrollAnimated
                        className="socials-list__divider accent divider-top anim-uni-clip-in"
                        as="div"
                        animation="clipIn"
                      />
                      <div className="socials-list__info">
                        <CommonScrollAnimated
                          className="socials-list__number accent anim-uni-slide-down"
                          as="div"
                          animation="slideDownLine"
                        >
                          <span>[04]</span>
                        </CommonScrollAnimated>
                        <CommonScrollAnimated
                          className="socials-list__name accent anim-uni-slide-down"
                          as="div"
                          animation="slideDownLine"
                        >
                          <span>Codepen</span>
                        </CommonScrollAnimated>
                      </div>
                      <CommonScrollAnimated
                        className="socials-list__arrow accent anim-uni-slide-down"
                        as="div"
                        animation="slideDownLine"
                      >
                        <i>
                          <svg
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            x="0px"
                            y="0px"
                            viewBox="0 0 18 18"
                            enableBackground="new 0 0 18 18"
                            xmlSpace="preserve"
                          >
                            <path
                              d="M18,0v14.4h-3.6V7.2h-3.6V3.6H3.6V0H18z M7.2,10.8h3.6V7.2H7.2C7.2,7.2,7.2,10.8,7.2,10.8z M3.6,14.4h3.6v-3.6H3.6V14.4z
                            M0,18h3.6v-3.6H0V18z"
                            />
                          </svg>
                        </i>
                      </CommonScrollAnimated>
                      <CommonScrollAnimated
                        className="socials-list__divider accent divider-bottom anim-uni-clip-in"
                        as="div"
                        animation="clipIn"
                      />
                    </a>
                    {/* socials item */}
                    <a
                      className="socials-list__item slide-right-up"
                      href="https://www.figma.com/community"
                      target="_blank"
                    >
                      <CommonScrollAnimated
                        className="socials-list__divider accent divider-top anim-uni-clip-in"
                        as="div"
                        animation="clipIn"
                      />
                      <div className="socials-list__info">
                        <CommonScrollAnimated
                          className="socials-list__number accent anim-uni-slide-down"
                          as="div"
                          animation="slideDownLine"
                        >
                          <span>[05]</span>
                        </CommonScrollAnimated>
                        <CommonScrollAnimated
                          className="socials-list__name accent anim-uni-slide-down"
                          as="div"
                          animation="slideDownLine"
                        >
                          <span>Comunidade Figma</span>
                        </CommonScrollAnimated>
                      </div>
                      <CommonScrollAnimated
                        className="socials-list__arrow accent anim-uni-slide-down"
                        as="div"
                        animation="slideDownLine"
                      >
                        <i>
                          <svg
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            x="0px"
                            y="0px"
                            viewBox="0 0 18 18"
                            enableBackground="new 0 0 18 18"
                            xmlSpace="preserve"
                          >
                            <path
                              d="M18,0v14.4h-3.6V7.2h-3.6V3.6H3.6V0H18z M7.2,10.8h3.6V7.2H7.2C7.2,7.2,7.2,10.8,7.2,10.8z M3.6,14.4h3.6v-3.6H3.6V14.4z
                            M0,18h3.6v-3.6H0V18z"
                            />
                          </svg>
                        </i>
                      </CommonScrollAnimated>
                      <CommonScrollAnimated
                        className="socials-list__divider accent divider-bottom anim-uni-clip-in"
                        as="div"
                        animation="clipIn"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Block - Section Title & Socials End */}
        </div>
      </div>
    </>
  );
}
