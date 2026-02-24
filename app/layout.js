import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({ subsets: ["latin"], weight: ["400", "600", "700", "800"] });

export const metadata = {
  title: "Hugvit – Ánægjukönnun",
  description: "Ánægjukönnun viðskiptavina fyrir vinnupakka Hugvits hf.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="is">
      <body className={openSans.className} style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
