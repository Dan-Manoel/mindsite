import "@/styles/template.css";
import { JetBrains_Mono, Manrope } from "next/font/google";
import Header1 from "@/components/headers/Header1";
import TemplateRuntimeProvider from "@/components/common/TemplateRuntimeProvider";
import MenuRuntimeShell from "@/components/headers/MenuRuntimeShell";
import { Metadata } from "next";
import { cookies } from "next/headers";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mindsite.com.br"),
  title: "Mindsite | Agência Digital",
  description:
    "A infraestrutura que o seu negócio precisa para escalar. Descubra como o Mindsite otimiza seu ecossistema digital do início ao fim.",
  icons: {
    icon: "/img/favicon/logo_filled.webp",
  },
  openGraph: {
    title: "Mindsite | Agência Digital",
    description:
      "A infraestrutura que o seu negócio precisa para escalar. Descubra como o Mindsite otimiza seu ecossistema digital do início ao fim.",
    images: [
      {
        url: "/img/logo_og1.jpg", // Motor de OG prefere JPG/PNG universal
        width: 1200,
        height: 630,
        alt: "Mindsite | Agência Digital",
        type: "image/jpeg",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image", // Instrui as plataformas a usar o layout hero/banner
    title: "Mindsite | Agência Digital",
    description:
      "Faça o seu trabalho se destacar no mundo digital.",
    images: ["/img/logo_og1.jpg"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const cookieTheme = cookieStore.get("template.theme")?.value;
  const initialTheme = cookieTheme === "dark" ? "dark" : "light";

  return (
    <html
      lang="en"
      className="no-touch"
      color-scheme={initialTheme}
      suppressHydrationWarning
    >
      <body
        suppressHydrationWarning
        className={`${manrope.variable} ${jetbrainsMono.variable}`}
        style={{
          '--font-default': 'var(--font-manrope)',
          '--font-accent': 'var(--font-jetbrains-mono)',
        } as React.CSSProperties}
      >
        <TemplateRuntimeProvider>
          <Header1 initialTheme={initialTheme} />
          <MenuRuntimeShell />
          {children}
        </TemplateRuntimeProvider>
      </body>
    </html>
  );
}
