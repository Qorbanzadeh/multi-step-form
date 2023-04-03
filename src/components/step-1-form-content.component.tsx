function Step1FormContent() {
  return (
    <>
      <label className="flex flex-col pt-4">
        <span className="text-marinBlue">Name</span>
        <input
          type="text"
          placeholder="e.g. Stephen King"
          className="p-2 border rounded-md border-coolGray"
        />
      </label>
      <label className="flex flex-col pt-4">
        <span className="text-marinBlue">Email Address</span>
        <input
          type="email"
          placeholder="e.g. stephenking@lorem.com"
          className="p-2 border rounded-md border-coolGray"
        />
      </label>
      <label className="flex flex-col pt-4">
        <span className="text-marinBlue">Phone Number</span>
        <input
          type="tel"
          placeholder="e.g. +1 234 567 890"
          className="p-2 border rounded-md border-coolGray"
        />
      </label>
    </>
  );
}

export default Step1FormContent;
