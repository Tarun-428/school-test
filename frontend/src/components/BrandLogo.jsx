import logo from '../assets/shaktipump-new-logo.png'

export default function BrandLogo({
  showText = true,
  textClassName = '',
  className = '',
  imageClassName = '',
}) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img
        src={logo}
        alt="Shakti Education trust logo"
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
