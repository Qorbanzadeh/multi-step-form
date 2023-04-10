function ResponsiveImage({
  mobileSrc,
  DesktopSrc,
  alt,
}: {
  mobileSrc: string;
  DesktopSrc: string;
  alt: string;
}) {
  return (
    <div className="pb-6" aria-hidden={alt ? false : true}>
      <picture>
        <source media="(max-width: 799px)" srcSet={mobileSrc} />
        <source srcSet={DesktopSrc} />
        <img src={mobileSrc} alt={alt} />
      </picture>
    </div>
  );
}

export default ResponsiveImage;
