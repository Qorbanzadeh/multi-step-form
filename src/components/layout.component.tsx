// library imports
import { FormProvider } from "@/contexts/form.context";
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
  return (
    <>
      <main
        className={`${font.variable} antialiased font-sans bg-magnolia h-screen text-coolGray w-screen`}
      >
        <FormProvider>{children}</FormProvider>
      </main>
    </>
  );
}

export default Layout;
