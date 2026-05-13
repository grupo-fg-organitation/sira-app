import { create } from 'zustand';

export type GlobalToastTipo = 'success' | 'info' | 'error';

export interface GlobalToastActual {
  mensaje: string;
  tipo: GlobalToastTipo;
  visible: boolean;
}

interface GlobalToastStore {
  toast: GlobalToastActual | null;
  showToast: (mensaje: string, tipo: GlobalToastTipo) => void;
  setToastVisible: (visible: boolean) => void;
  clearToast: () => void;
}

export const useGlobalToastStore = create<GlobalToastStore>(set => ({
  toast: null,
  showToast(mensaje, tipo) {
    set({
      toast: { mensaje, tipo, visible: true },
    });
  },
  setToastVisible(visible) {
    set(state =>
      state.toast ? { toast: { ...state.toast, visible } } : state,
    );
  },
  clearToast() {
    set({ toast: null });
  },
}));

export function showGlobalToast(mensaje: string, tipo: GlobalToastTipo): void {
  useGlobalToastStore.getState().showToast(mensaje, tipo);
}
