function FormHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="md:px-8">
      <h1 className="text-3xl font-bold text-left text-marinBlue">{title}</h1>
      <p>{description}</p>
    </div>
  );
}

export default FormHeader;
