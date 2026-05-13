import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import { AlertTriangle, Calendar, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const CANVAS_WIDTH = 560;
const CANVAS_HEIGHT = 160;

export interface ActionSignatureModalProps {
  onClose: () => void;
  onConfirm: (
    signatureData: string,
    fechaCompromiso: string,
  ) => void | Promise<void>;
  folio: string;
  descripcion: string;
}

export function ActionSignatureModal({
  onClose,
  onConfirm,
  folio,
  descripcion,
}: ActionSignatureModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawingRef = useRef(false);
  const [fechaCompromiso, setFechaCompromiso] = useState('');
  const [hasSignature, setHasSignature] = useState(false);

  const paintBlankCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, []);

  useLayoutEffect(() => {
    paintBlankCanvas();
  }, [paintBlankCanvas]);

  const resetDrawing = useCallback(() => {
    paintBlankCanvas();
    setHasSignature(false);
  }, [paintBlankCanvas]);

  function getCanvasCoords(
    event: ReactPointerEvent<HTMLCanvasElement>,
  ): { x: number; y: number } {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (event.clientX - rect.left) * scaleX,
      y: (event.clientY - rect.top) * scaleY,
    };
  }

  function handlePointerDown(event: ReactPointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    canvas.setPointerCapture(event.pointerId);
    drawingRef.current = true;
    const { x, y } = getCanvasCoords(event);
    ctx.beginPath();
    ctx.moveTo(x, y);
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLCanvasElement>) {
    if (!drawingRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const { x, y } = getCanvasCoords(event);
    ctx.lineTo(x, y);
    ctx.stroke();
    setHasSignature(true);
  }

  function handlePointerUp(event: ReactPointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    if (canvas?.hasPointerCapture(event.pointerId)) {
      canvas.releasePointerCapture(event.pointerId);
    }
    drawingRef.current = false;
  }

  async function handleConfirm(): Promise<void> {
    const canvas = canvasRef.current;
    if (!canvas || !hasSignature || !fechaCompromiso) return;
    await Promise.resolve(
      onConfirm(canvas.toDataURL('image/png'), fechaCompromiso),
    );
    onClose();
  }

  const canConfirm = hasSignature && fechaCompromiso.length > 0;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      <div
        role='presentation'
        className='absolute inset-0 bg-black/60 backdrop-blur-sm'
        onClick={onClose}
      />

      <div
        role='dialog'
        aria-modal
        aria-labelledby='action-signature-title'
        className='relative z-10 mx-4 w-full max-w-lg rounded-xl border border-border bg-card p-6 shadow-xl'
      >
        <button
          type='button'
          onClick={onClose}
          className='absolute right-4 top-4 text-muted-foreground transition-colors hover:text-foreground'
        >
          <X className='h-5 w-5' />
        </button>

        <div className='mb-6'>
          <h2
            id='action-signature-title'
            className='text-lg font-semibold text-foreground'
          >
            Firma de enterado
          </h2>
          <p className='mt-1 text-sm text-muted-foreground'>
            Confirma que has recibido y aceptas dar seguimiento a esta acción
          </p>
        </div>

        <div className='mb-6 rounded-lg border border-border bg-muted/30 p-4'>
          <p className='font-mono text-sm font-medium text-primary'>{folio}</p>
          <p className='mt-2 line-clamp-2 text-sm text-muted-foreground'>
            {descripcion}
          </p>
        </div>

        <div className='mb-4'>
          <span className='mb-2 block text-sm font-medium text-foreground'>
            Tu firma
          </span>
          <div className='overflow-hidden rounded-lg border border-border bg-white'>
            <canvas
              ref={canvasRef}
              width={CANVAS_WIDTH}
              height={CANVAS_HEIGHT}
              className='h-40 w-full touch-none cursor-crosshair'
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
            />
          </div>
          <button
            type='button'
            onClick={resetDrawing}
            className='mt-2 text-sm text-muted-foreground transition-colors hover:text-foreground'
          >
            Limpiar firma
          </button>
        </div>

        <div className='mb-6'>
          <span className='mb-2 block text-sm font-medium text-foreground'>
            Fecha de compromiso aceptada
          </span>
          <div className='relative'>
            <Calendar className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
            <Input
              type='date'
              value={fechaCompromiso}
              onChange={event => setFechaCompromiso(event.target.value)}
              className='pl-10'
            />
          </div>
        </div>

        <div className='mb-6 flex items-start gap-3 rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-4'>
          <AlertTriangle className='h-5 w-5 shrink-0 text-yellow-400' />
          <p className='text-sm text-yellow-400'>
            Al firmar confirmas que recibiste y aceptas dar seguimiento a esta
            acción en la fecha indicada.
          </p>
        </div>

        <div className='flex items-center justify-end gap-3'>
          <Button type='button' variant='outline' onClick={onClose}>
            Cancelar
          </Button>
          <Button
            type='button'
            onClick={handleConfirm}
            disabled={!canConfirm}
            className={cn(
              canConfirm
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-muted text-muted-foreground',
            )}
          >
            Confirmar firma
          </Button>
        </div>
      </div>
    </div>
  );
}
