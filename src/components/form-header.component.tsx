function FormHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <>
      <h1 className="text-3xl font-bold text-left text-marinBlue">{title}</h1>
      <p>{description}</p>
    </>
  );
}

export default FormHeader;
