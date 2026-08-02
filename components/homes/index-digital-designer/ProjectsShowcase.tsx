"use client";
import Link from "next/link";
import Image from "next/image";
import TextScramble from "@/components/animations/TextScramble";
import { digitalDesignerProjectsShowcase } from "@/data/projects";
import CommonProjectsClip, {
  CommonProjectsClipBackground,
  CommonProjectsClipItem,
  CommonProjectsClipTrigger,
} from "@/components/animations/CommonProjectsClip";
export default function ProjectsShowcase() {
  return (
    <>
      <div className="mxd-section">
        {/* Block - Projects ClipPath Showcase Start */}
        <CommonProjectsClip className="mxd-showcase-clip">
          {/* backgrounds */}
          <div>
            {digitalDesignerProjectsShowcase.map((project, index) => (
              <CommonProjectsClipTrigger
                key={`bg-${project.bgImageSrc}`}
                index={index}
                className="mxd-showcase-clip__trigger"
              >
                <CommonProjectsClipBackground
                  as={Image}
                  index={index}
                  className="mxd-showcase-clip__bg image-auto"
                  alt={project.cardImageAlt}
                  src={project.bgImageSrc}
                  width={1920}
                  height={1280}
                />
                <div className="mxd-showcase-clip__cover" />
              </CommonProjectsClipTrigger>
            ))}
          </div>
          {/* items */}
          <div className="mxd-showcase-clip__track">
            <div className="mxd-showcase-clip__sticky">
              {digitalDesignerProjectsShowcase.map((project, index) => (
                <CommonProjectsClipItem
                  key={`item-${project.cardImageSrc}`}
                  as={Link}
                  index={index}
                  className="mxd-showcase-clip__item active-cursor-permanent"
                  href={project.href}
                  data-cursor-text={project.cursorText}
                >
                  <p className="mxd-showcase-clip__title permanent">
                    {project.titleLines[0]}
                    <br />
                    {project.titleLines[1]}
                  </p>
                  <Image
                    className="mxd-showcase-clip__image image-auto"
                    alt={project.cardImageAlt}
                    src={project.cardImageSrc}
                    width={700}
                    height={700}
                  />
                  <div className="mxd-showcase-clip__tags">
                    {project.tags.map((tag) => (
                      <TextScramble
                        key={`${project.cardImageSrc}-${tag}`}
                        className="tag tag-m tag-permanent mxd-scramble"
                      >
                        {tag}
                      </TextScramble>
                    ))}
                  </div>
                </CommonProjectsClipItem>
              ))}
            </div>
          </div>
        </CommonProjectsClip>
        {/* Block - Projects ClipPath Showcase End */}
      </div>
    </>
  );
}
