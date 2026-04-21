import GravityStarsBackground from './GravityStarsBackground'

export default function PageHero({ eyebrow, title, description, children, compact = false }) {
  return (
    <section className={`relative overflow-hidden bg-dark text-white ${compact ? 'pt-24 pb-12' : 'pt-28 pb-16'}`} data-no-motion>
      <GravityStarsBackground
        starsCount={compact ? 45 : 65}
        starsSize={1.6}
        starsOpacity={0.62}
        glowIntensity={13}
        movementSpeed={0.16}
        mouseInfluence={105}
        gravityStrength={55}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_28%,rgba(10,132,216,0.24),transparent_30%),linear-gradient(90deg,rgba(3,26,45,0.98),rgba(3,26,45,0.84)_58%,rgba(3,26,45,0.6))]" />
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary" />

      <div className="relative max-w-6xl mx-auto px-6">
        <p className="animate-fade-up text-primary-light text-xs font-semibold uppercase mb-3">
          {eyebrow}
        </p>
        <h1 className="animate-fade-up animation-delay-100 font-heading text-5xl md:text-6xl font-bold uppercase mb-4">
          {title}
        </h1>
        {description && (
          <p className="animate-fade-up animation-delay-200 text-blue-50/80 max-w-3xl leading-relaxed">
            {description}
          </p>
        )}
        {children && (
          <div className="animate-fade-up animation-delay-300 mt-8">
            {children}
          </div>
        )}
      </div>
    </section>
  )
}
