import {
  startTransition,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  AlertTriangle,
  ArrowLeft,
  ClipboardList,
  ChevronDown,
  FileText,
  LayoutDashboard,
  ListChecks,
  LogOut,
  Menu,
  User,
  Users,
  X,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GRUPO_FG_LOGO_URL } from './global-brand';
import { useAuthSessionOptional } from '@/features/auth/context';
import { authLogout } from '@/features/auth/service/auth.service';
import { cn } from '@/lib/utils';

type HeaderNavItem = {
  name: string;
  href: string;
  icon: LucideIcon;
  adminOnly?: boolean;
};

const navigation: readonly HeaderNavItem[] = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Recorridos', href: '/recorridos', icon: ClipboardList },
  { name: 'Acciones', href: '/acciones', icon: AlertTriangle },
  { name: 'Mis Acciones', href: '/mis-acciones', icon: User },
  { name: 'Usuarios', href: '/usuarios', icon: Users },
  {
    name: 'Plantillas',
    href: '/checklists',
    icon: ListChecks,
    adminOnly: true,
  },
  { name: 'Reportes', href: '/reportes', icon: FileText },
];

const rutasConEnlace: ReadonlySet<string> = new Set<string>([
  '/',
  '/recorridos',
  '/acciones',
  '/mis-acciones',
  '/usuarios',
  '/checklists',
  '/reportes',
]);

export interface GlobalHeaderProps {
  mounted?: boolean;
  onBackToHome?: () => void;
  etiquetaBotonVolver?: string;
  mostrarAccionesDerecha?: boolean;
  accionExtraDerecha?: ReactNode;
}

function isRutaActiva(pathname: string, href: string): boolean {
  if (href === '/') {
    return pathname === '/';
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

function itemNavClassName(
  activo: boolean,
  esEnlace: boolean,
  densidad: 'compacta' | 'amplia',
): string {
  return cn(
    'flex cursor-pointer items-center rounded-lg text-sm font-medium transition-all duration-200 ease-out',
    densidad === 'compacta' ? 'gap-2 px-3 py-2' : 'gap-3 px-3 py-2.5',
    esEnlace && 'motion-safe:hover:-translate-y-px motion-safe:hover:shadow-sm',
    activo
      ? 'bg-primary/12 text-primary shadow-sm ring-1 ring-primary/20'
      : 'text-muted-foreground hover:bg-muted/90 hover:text-foreground',
  );
}

export function GlobalHeader({
  mounted = true,
  onBackToHome,
  etiquetaBotonVolver = 'Volver al inicio',
  mostrarAccionesDerecha = true,
  accionExtraDerecha,
}: GlobalHeaderProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const authSession = useAuthSessionOptional();

  const esModuloConVolver = onBackToHome !== undefined;

  const usuarioSesion = authSession?.user;
  const nombreMostrado = usuarioSesion?.fullName ?? '';
  const correoUsuario = usuarioSesion?.email ?? '';
  const etiquetaRol = usuarioSesion?.roleLabel ?? '';
  const inicialesUsuario = usuarioSesion?.initials ?? '';

  const visibleNavigation = navigation.filter(
    item => !item.adminOnly || usuarioSesion?.role === 'ADMIN',
  );

  useEffect(() => {
    startTransition(() => {
      setMobileOpen(false);
      setUserMenuOpen(false);
    });
  }, [pathname]);

  async function handleLogout(): Promise<void> {
    await authLogout().catch(() => undefined);
    navigate('/login', { replace: true });
  }

  const marcaBarra = (
    <div className='hidden min-w-0 sm:block'>
      <h1 className='truncate text-sm font-semibold text-foreground'>
        SIRA - SH
      </h1>
      <p className='text-xs text-muted-foreground'>Grupo FG</p>
    </div>
  );

  const logoMarca = (
    <Link
      to='/'
      className='group/logo flex min-w-0 max-w-[min(100%,20rem)] shrink-0 cursor-pointer items-center gap-3 rounded-xl p-1 ring-1 ring-transparent transition-all duration-300 hover:bg-muted/40 hover:shadow-md hover:ring-border/50 motion-safe:hover:-translate-y-0.5 active:scale-[0.99]'
      onClick={() => setMobileOpen(false)}
    >
      <img
        src={GRUPO_FG_LOGO_URL}
        alt='Grupo FG'
        className='h-9 w-auto max-w-[min(100%,9rem)] object-contain object-left transition-transform duration-300 motion-safe:group-hover/logo:scale-[1.02] sm:h-10 sm:max-w-44'
      />
      {marcaBarra}
    </Link>
  );

  const listaNavegacionDesktop = visibleNavigation.map(item => {
    const activo = isRutaActiva(pathname, item.href);

    if (item.href === '/') {
      return (
        <NavLink
          key={item.name}
          to='/'
          end
          className={itemNavClassName(activo, true, 'compacta')}
        >
          <item.icon className='h-4 w-4' />
          {item.name}
        </NavLink>
      );
    }

    if (rutasConEnlace.has(item.href)) {
      return (
        <NavLink
          key={item.name}
          to={item.href}
          className={itemNavClassName(activo, true, 'compacta')}
        >
          <item.icon className='h-4 w-4' />
          {item.name}
        </NavLink>
      );
    }

    return (
      <span
        key={item.name}
        role='presentation'
        className={cn(
          itemNavClassName(activo, false, 'compacta'),
          'opacity-95',
        )}
      >
        <item.icon className='h-4 w-4 shrink-0 opacity-80' />
        {item.name}
      </span>
    );
  });

  const listaNavegacionMobile = visibleNavigation.map(item => {
    const activo = isRutaActiva(pathname, item.href);

    if (item.href === '/') {
      return (
        <NavLink
          key={item.name}
          to='/'
          end
          className={itemNavClassName(activo, true, 'amplia')}
          onClick={() => setMobileOpen(false)}
        >
          <item.icon className='h-5 w-5 shrink-0' />
          {item.name}
        </NavLink>
      );
    }

    if (rutasConEnlace.has(item.href)) {
      return (
        <NavLink
          key={item.name}
          to={item.href}
          className={itemNavClassName(activo, true, 'amplia')}
          onClick={() => setMobileOpen(false)}
        >
          <item.icon className='h-5 w-5 shrink-0' />
          {item.name}
        </NavLink>
      );
    }

    return (
      <span
        key={item.name}
        role='presentation'
        className={cn(itemNavClassName(activo, false, 'amplia'), 'opacity-95')}
      >
        <item.icon className='h-5 w-5 shrink-0 opacity-80' />
        {item.name}
      </span>
    );
  });

  const panelMovil = (
    <div
      className={cn(
        'fixed inset-x-0 bottom-0 top-16 z-100 overflow-x-hidden lg:hidden',
        mobileOpen
          ? 'visible pointer-events-auto'
          : 'invisible pointer-events-none',
      )}
      aria-hidden={!mobileOpen}
    >
      <div
        className={cn(
          'absolute inset-0 bg-black/50 transition-opacity duration-300 motion-reduce:transition-none',
          mobileOpen ? 'opacity-100' : 'opacity-0',
        )}
        aria-hidden={!mobileOpen}
        onClick={() => setMobileOpen(false)}
      />

      <div
        className={cn(
          'absolute right-0 top-0 flex h-full w-[min(100vw,20rem)] max-w-full flex-col border-l border-border bg-background/98 shadow-2xl shadow-black/20 ring-1 ring-black/5 backdrop-blur-md transition-transform duration-300 ease-out motion-reduce:transition-none dark:ring-white/10',
          mobileOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className='flex h-16 shrink-0 items-center border-b border-border px-4'>
          <div className='flex min-w-0 flex-1 cursor-default items-center gap-3'>
            <img
              src={GRUPO_FG_LOGO_URL}
              alt='Grupo FG'
              className='h-9 w-auto max-w-30 shrink-0 object-contain object-left'
            />
            <div className='min-w-0'>
              <h1 className='truncate text-sm font-semibold text-foreground'>
                SIRA - SH
              </h1>
              <p className='text-xs text-muted-foreground'>Grupo FG</p>
            </div>
          </div>
        </div>

        <nav className='min-h-0 flex-1 space-y-1 overflow-y-auto overscroll-y-contain p-4'>
          {listaNavegacionMobile}
        </nav>

        <div className='shrink-0 border-t border-border p-4'>
          <div className='flex items-center gap-3 rounded-lg border border-border/60 bg-muted/40 px-3 py-3 shadow-inner transition-shadow duration-300 hover:shadow-sm'>
            <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground'>
              {inicialesUsuario || '?'}
            </div>
            <div className='min-w-0 flex-1'>
              <p className='truncate text-sm font-medium text-foreground'>
                {nombreMostrado}
              </p>
              <span className='mt-1 inline-flex items-center rounded-full bg-primary/12 px-2 py-0.5 text-xs font-medium text-primary'>
                {etiquetaRol}
              </span>
            </div>
          </div>
          <button
            type='button'
            onClick={() => {
              setMobileOpen(false);
              void handleLogout();
            }}
            className='mt-3 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-border px-3 py-2.5 text-sm font-medium text-muted-foreground shadow-sm transition-all duration-200 hover:bg-muted hover:text-foreground hover:shadow-md active:scale-[0.99]'
          >
            <LogOut className='h-4 w-4 shrink-0' />
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );

  if (esModuloConVolver) {
    return (
      <header
        className={cn(
          'sticky top-0 z-50 w-full shrink-0 border-b border-border bg-background/95 shadow-sm backdrop-blur-md transition-opacity duration-500 supports-backdrop-filter:bg-background/80',
          mounted ? 'opacity-100' : 'opacity-0',
        )}
      >
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='flex h-16 items-center justify-between gap-3'>
            <Button
              type='button'
              variant='ghost'
              onClick={onBackToHome}
              className='h-9 min-w-0 max-w-[min(100%,12rem)] shrink cursor-pointer shadow-sm transition-all duration-200 hover:bg-muted hover:shadow-md motion-safe:hover:-translate-y-px active:scale-[0.98] sm:h-10 sm:max-w-none'
            >
              <ArrowLeft className='mr-1 h-4 w-4 shrink-0 sm:mr-2 sm:h-5 sm:w-5' />
              <span className='truncate'>{etiquetaBotonVolver}</span>
            </Button>
            <Link
              to='/'
              className='flex shrink-0 cursor-pointer rounded-lg border border-border/60 bg-card/40 p-1.5 shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:border-primary/35 hover:bg-card hover:shadow-md motion-safe:hover:-translate-y-0.5 active:scale-[0.98] dark:ring-white/10'
            >
              <img
                src={GRUPO_FG_LOGO_URL}
                alt='Grupo FG'
                className='h-8 sm:h-9'
              />
            </Link>
            <div className='flex min-w-0 items-center justify-end gap-2'>
              {accionExtraDerecha ?? null}
              {mostrarAccionesDerecha ? (
                <span className='hidden truncate rounded-lg border border-border/70 bg-muted/40 px-3 py-2 text-center text-xs font-semibold text-foreground/90 shadow-sm transition-shadow duration-200 hover:shadow-md sm:inline sm:text-sm'>
                  SIRA - SH
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full shrink-0 border-b border-border bg-background/95 shadow-sm backdrop-blur-md transition-opacity duration-500 supports-backdrop-filter:bg-background/80',
        mounted ? 'opacity-100' : 'opacity-0',
      )}
    >
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='flex h-16 items-center justify-between gap-3'>
          {logoMarca}

          <nav className='hidden items-center gap-1 lg:flex'>
            {listaNavegacionDesktop}
          </nav>

          <div className='hidden items-center gap-4 lg:flex'>
            <div className='relative'>
              <button
                type='button'
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className='group flex cursor-pointer items-center gap-2 rounded-lg border border-transparent px-3 py-2 text-sm font-medium text-muted-foreground shadow-sm transition-all duration-200 hover:border-border/80 hover:bg-muted/60 hover:text-foreground hover:shadow-md motion-safe:hover:-translate-y-px active:scale-[0.98]'
              >
                <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground shadow-sm ring-2 ring-primary/20 transition-transform duration-200 group-hover:scale-105'>
                  {inicialesUsuario || '?'}
                </div>
                <span className='hidden xl:inline'>{nombreMostrado}</span>
                <ChevronDown
                  className={cn(
                    'h-4 w-4 shrink-0 transition-transform duration-200',
                    userMenuOpen ? 'rotate-180' : 'rotate-0',
                  )}
                />
              </button>

              {userMenuOpen ? (
                <>
                  <div
                    className='fixed inset-0 z-40'
                    aria-hidden
                    onClick={() => setUserMenuOpen(false)}
                  />
                  <div className='absolute right-0 top-full z-50 mt-2 w-56 origin-top-right rounded-xl border border-border/80 bg-card/95 p-2 shadow-xl shadow-black/10 ring-1 ring-black/5 backdrop-blur-md duration-200 animate-in fade-in dark:ring-white/10'>
                    <div className='mb-2 border-b border-border px-3 py-2'>
                      <p className='text-sm font-medium text-foreground'>
                        {nombreMostrado}
                      </p>
                      <p className='text-xs text-muted-foreground'>
                        {correoUsuario}
                      </p>
                      <span className='mt-1 inline-flex items-center rounded-full bg-[#FF4D00]/10 px-2 py-0.5 text-xs font-medium text-[#FF4D00]'>
                        {etiquetaRol}
                      </span>
                    </div>
                    <button
                      type='button'
                      onClick={() => {
                        setUserMenuOpen(false);
                        void handleLogout();
                      }}
                      className='flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-muted hover:text-foreground active:scale-[0.99]'
                    >
                      <LogOut className='h-4 w-4 shrink-0' />
                      Cerrar sesión
                    </button>
                  </div>
                </>
              ) : null}
            </div>
          </div>

          <button
            type='button'
            className='cursor-pointer rounded-lg border border-border/70 bg-muted/30 p-2 text-foreground shadow-sm transition-all duration-200 hover:border-primary/30 hover:bg-muted/70 hover:shadow-md active:scale-95 lg:hidden'
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {mobileOpen ? (
              <X className='h-6 w-6' />
            ) : (
              <Menu className='h-6 w-6' />
            )}
          </button>
        </div>
      </div>

      {typeof document !== 'undefined'
        ? createPortal(panelMovil, document.body)
        : null}
    </header>
  );
}
