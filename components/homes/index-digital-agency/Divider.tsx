import BlurSection from "@/components/animations/BlurSection";
import Link from "next/link";
import { CommonScrollAnimated } from "@/components/animations/CommonScrollAnimated";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import TextScramble from "@/components/animations/TextScramble";
import CommonCursorTrailTransparent, {
  CommonCursorTrailContent,
  CommonCursorTrailImage,
  CommonCursorTrailWrapper,
} from "@/components/animations/CommonCursorTrailTransparent";

export default function Divider() {
  return (
    <>
      <BlurSection className="mxd-section bg-color-opposite overflow-hidden">
        <CommonCursorTrailTransparent
          as="div"
          className="cursor-trail-transparent"
        >
          {/* Effect - Cursor Trail Transparent Start */}
          <CommonCursorTrailWrapper className="mxd-trail-transparent-wrapper">
            <CommonCursorTrailContent className="mxd-trail-transparent-content">
              <CommonCursorTrailImage
                index={0}
                className="mxd-trail-transparent-image"
                alt="MINDSITE Template Cursor Trail Image"
                src="/img/cursor-trail-transparent/01_trail.webp"
                width={400}
                height={521}
              />
              <CommonCursorTrailImage
                index={1}
                className="mxd-trail-transparent-image"
                alt="MINDSITE Template Cursor Trail Image"
                src="/img/cursor-trail-transparent/02_trail.webp"
                width={412}
                height={400}
              />
              <CommonCursorTrailImage
                index={2}
                className="mxd-trail-transparent-image"
                alt="MINDSITE Template Cursor Trail Image"
                src="/img/cursor-trail-transparent/03_trail.webp"
                width={485}
                height={400}
              />
              <CommonCursorTrailImage
                index={3}
                className="mxd-trail-transparent-image"
                alt="MINDSITE Template Cursor Trail Image"
                src="/img/cursor-trail-transparent/04_trail.webp"
                width={530}
                height={400}
              />
              <CommonCursorTrailImage
                index={4}
                className="mxd-trail-transparent-image"
                alt="MINDSITE Template Cursor Trail Image"
                src="/img/cursor-trail-transparent/05_trail.webp"
                width={400}
                height={520}
              />
              <CommonCursorTrailImage
                index={5}
                className="mxd-trail-transparent-image"
                alt="MINDSITE Template Cursor Trail Image"
                src="/img/cursor-trail-transparent/06_trail.webp"
                width={407}
                height={400}
              />
              <CommonCursorTrailImage
                index={6}
                className="mxd-trail-transparent-image"
                alt="MINDSITE Template Cursor Trail Image"
                src="/img/cursor-trail-transparent/07_trail.webp"
                width={400}
                height={480}
              />
              <CommonCursorTrailImage
                index={7}
                className="mxd-trail-transparent-image"
                alt="MINDSITE Template Cursor Trail Image"
                src="/img/cursor-trail-transparent/08_trail.webp"
                width={637}
                height={400}
              />
              <CommonCursorTrailImage
                index={8}
                className="mxd-trail-transparent-image"
                alt="MINDSITE Template Cursor Trail Image"
                src="/img/cursor-trail-transparent/09_trail.webp"
                width={400}
                height={992}
              />
            </CommonCursorTrailContent>
          </CommonCursorTrailWrapper>
          {/* Effect - Cursor Trail Transparent End */}

          {/* Divider - Divider XL Start */}
          <div className="mxd-container w-full max-w-full px-4 sm:px-6 md:px-8">
            <div className="mxd-divider-xl padding-top-subtitle padding-bottom-default">
              <div className="mxd-divider-xl__content">
                <CommonScrollAnimated
                  className="mxd-divider-xl__btngroup difference anim-uni-in-up"
                  as="div"
                  animation="inUp"
                >
                  <Link
                    className="btn btn-line btn-line-permanent"
                    href={`/contact`}
                  >
                    <TextScramble className="btn-caption mxd-scramble">
                      Contato
                    </TextScramble>
                  </Link>
                </CommonScrollAnimated>
                <div className="mxd-divider-xl__caption difference">
                  <Link
                    className="active-cursor-accent"
                    data-cursor-text="Vamos Conversar"
                    href={`/contact`}
                  >
                    <CommonAnimatedText
                      as="h2"
                      className="permanent reveal-type"
                      animation="revealType"
                    >
                      Pronto para um projeto revolucionário?
                    </CommonAnimatedText>
                  </Link>
                </div>

                {/* Deck de Vídeos Estilizados em Ângulo - Calibração de Largura e Proporção 16:9 */}
                <div 
                  className="mxd-divider-gif relative flex items-center justify-center w-full mx-auto py-12 select-none overflow-visible"
                  style={{
                    perspective: "1200px",
                    minHeight: "420px",
                  }}
                >
                  {/* Carta Esquerda */}
                  <div 
                    className="mxd-divider-gif__back left accent absolute rounded-2xl overflow-hidden transition-all duration-500 ease-out cursor-pointer hover:z-30 hover:scale-105"
                    style={{
                      width: "clamp(220px, 26vw, 390px)",
                      height: "clamp(123px, 14.62vw, 219px)", // Proporção exata 16:9
                      transform: "translateX(-38%) translateY(10px) rotate(-9deg)",
                      zIndex: 1,
                      boxShadow: "0 20px 45px -12px rgba(0, 0, 0, 0.85), 0 0 20px rgba(0, 0, 0, 0.5)",
                      willChange: "transform",
                    }}
                  >
                    <video
                      src="/img/gifs/16265725_3840_2160_30fps.webm"
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover pointer-events-none block"
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>

                  {/* Carta Central */}
                  <div 
                    className="mxd-divider-gif__front relative rounded-2xl overflow-hidden transition-all duration-500 ease-out cursor-pointer hover:z-30 hover:scale-105"
                    style={{
                      width: "clamp(250px, 29vw, 430px)",
                      height: "clamp(140px, 16.31vw, 241px)", // Proporção exata 16:9
                      transform: "translateY(-12px) rotate(1deg)",
                      zIndex: 3,
                      boxShadow: "0 25px 55px -12px rgba(0, 0, 0, 0.95), 0 0 25px rgba(0, 0, 0, 0.6)",
                      willChange: "transform",
                    }}
                  >
                    <video
                      src="/img/gifs/nice-thumbs-up.webm"
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover pointer-events-none block"
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>

                  {/* Carta Direita */}
                  <div 
                    className="mxd-divider-gif__back right accent absolute rounded-2xl overflow-hidden transition-all duration-500 ease-out cursor-pointer hover:z-30 hover:scale-105"
                    style={{
                      width: "clamp(220px, 26vw, 390px)",
                      height: "clamp(123px, 14.62vw, 219px)", // Proporção exata 16:9
                      transform: "translateX(38%) translateY(12px) rotate(10deg)",
                      zIndex: 2,
                      boxShadow: "0 20px 45px -12px rgba(0, 0, 0, 0.85), 0 0 20px rgba(0, 0, 0, 0.5)",
                      willChange: "transform",
                    }}
                  >
                    <video
                      src="/img/gifs/16275126_2560_1440_30fps.webm"
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover pointer-events-none block"
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>
                </div>

              </div>
            </div>
          </div>
          {/* Divider - Divider XL End */}
        </CommonCursorTrailTransparent>
      </BlurSection>
    </>
  );
}