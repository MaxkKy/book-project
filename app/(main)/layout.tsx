import Navbar from "@/components/navbar/page";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
