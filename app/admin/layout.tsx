import Footer1 from "@/components/footers/Footer1";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div style={{ flex: 1, paddingBottom: "8rem" }}>
        {children}
      </div>
      <Footer1 />
    </div>
  );
}
