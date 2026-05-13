import { GRUPO_FG_LOGO_BLANCO_URL } from '../interfaces';

export function LoginHeroPanel() {
  return (
    <div className='relative hidden w-1/2 flex-col justify-between overflow-hidden bg-linear-to-br from-[#0A2240] via-[#0c2a4a] to-[#051020] p-12 lg:flex'>
      <div
        className='pointer-events-none absolute -right-28 -top-28 h-88 w-88 rounded-full bg-[#FF4D00]/25 blur-3xl motion-safe:animate-pulse'
        aria-hidden
      />
      <div
        className='pointer-events-none absolute -bottom-36 -left-20 h-80 w-80 rounded-full bg-sky-400/10 blur-3xl motion-safe:animate-pulse motion-safe:animation-duration-[4s]'
        aria-hidden
      />

      <header className='login-rise relative z-1 flex items-center gap-4'>
        <div className='flex h-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 px-3.5 shadow-lg ring-1 ring-white/20 transition-transform duration-300 ease-out motion-safe:hover:scale-[1.02]'>
          <img
            src={GRUPO_FG_LOGO_BLANCO_URL}
            alt='Grupo FG'
            className='h-9 w-auto max-w-[132px] object-contain object-left'
            loading='lazy'
            decoding='async'
            referrerPolicy='no-referrer'
          />
        </div>
        <div className='min-w-0'>
          <h1 className='text-xl font-semibold tracking-tight text-white'>
            SIRA - SH
          </h1>
        </div>
      </header>

      <div className='login-rise login-rise-delay-1 relative z-1 max-w-lg space-y-8'>
        <div className='space-y-4'>
          <h2 className='text-balance text-4xl font-semibold leading-[1.15] tracking-tight text-white'>
            Seguridad e higiene industrial, en un solo lugar
          </h2>
          <p className='text-lg leading-relaxed text-white/70'>
            Coordina inspecciones, acciones correctivas y reportes con un
            entorno pensado para equipos corporativos.
          </p>
        </div>
      </div>

      <footer className='login-rise login-rise-delay-2 relative z-1 text-sm text-white/45' />
    </div>
  );
}
