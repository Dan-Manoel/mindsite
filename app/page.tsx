// import IndexBrandingStudioPage from "./(homes)/index-branding-studio/page";
import PreviewPage from "./preview/page";

/** Home reuses the branding-studio page; metadata must be exported here so `/` gets a document title. */
export { metadata } from "./(homes)/index-branding-studio/page";

export default function Home() {
  return <PreviewPage />;
}
