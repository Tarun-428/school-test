const SHAKTI_LOGO_URL = 'https://github.com/user-attachments/assets/cf10aba5-3834-4eeb-a8d8-fdafb58a16cc'

export default function BrandLogo({
  showText = true,
  textClassName = '',
  className = '',
  imageClassName = '',
}) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img
        src={SHAKTI_LOGO_URL}
        alt="Shakti Pumps logo"
        className={`h-9 w-auto object-contain ${imageClassName}`}
        loading="lazy"
      />
      {showText && (
        <p className={`font-heading font-bold leading-tight ${textClassName}`}>
          Shakti Education trust
        </p>
      )}
    </div>
  )
}
