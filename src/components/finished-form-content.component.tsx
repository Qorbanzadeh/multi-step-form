// library imports
import Image from "next/image";
// asset imports
import ThankYouIcon from "../assets/images/icon-thank-you.svg";

function FinishedFormContent() {
  return (
    <div className="flex flex-col items-center justify-center space-y-2 text-center md:my-auto">
      <div className="w-[50px] h-[50px] md:w-[100px] md:h-[100px]">
        <Image src={ThankYouIcon} alt="Thank you icon" />
      </div>
      <h2 className="text-2xl font-bold text-marinBlue">Thank you!</h2>
      <p className="">
        Thanks For confirming your subscription! We hope you have fun using our
        platform. If you ever need support, please feel free to email us at
        support@loremgaming.com.
      </p>
    </div>
  );
}

export default FinishedFormContent;
