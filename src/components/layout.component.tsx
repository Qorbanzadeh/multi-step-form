// library imports
import localFont from "next/font/local";

const font = localFont({
  src: [
    {
      path: "../assets/fonts/Ubuntu-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/Ubuntu-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/Ubuntu-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-ubuntu",
});

function Layout({ children }: { children: React.ReactNode }) {
  return <main className={`${font.variable} font-sans`}>{children}</main>;
}

export default Layout;
