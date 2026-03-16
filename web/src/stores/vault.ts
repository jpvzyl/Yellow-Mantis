import { create } from 'zustand'
import type { VaultBusiness, VaultView } from '../types/vault'

interface VaultStore {
  activeBusiness: VaultBusiness | null
  activeView: VaultView
  activePageUrl: string | null
  activeMessageId: string | null
  showBusinessForm: boolean
  showPageForm: boolean
  showDocumentUpload: boolean

  setActiveBusiness: (business: VaultBusiness | null) => void
  setActiveView: (view: VaultView) => void
  setActivePageUrl: (url: string | null) => void
  setActiveMessageId: (id: string | null) => void
  setShowBusinessForm: (show: boolean) => void
  setShowPageForm: (show: boolean) => void
  setShowDocumentUpload: (show: boolean) => void
  reset: () => void
}

export const useVaultStore = create<VaultStore>((set) => ({
  activeBusiness: null,
  activeView: 'inbox',
  activePageUrl: null,
  activeMessageId: null,
  showBusinessForm: false,
  showPageForm: false,
  showDocumentUpload: false,

  setActiveBusiness: (business) => set({ activeBusiness: business, activeView: 'inbox', activePageUrl: null, activeMessageId: null }),
  setActiveView: (view) => set({ activeView: view, activePageUrl: null, activeMessageId: null }),
  setActivePageUrl: (url) => set({ activePageUrl: url, activeView: 'pages' }),
  setActiveMessageId: (id) => set({ activeMessageId: id }),
  setShowBusinessForm: (show) => set({ showBusinessForm: show }),
  setShowPageForm: (show) => set({ showPageForm: show }),
  setShowDocumentUpload: (show) => set({ showDocumentUpload: show }),
  reset: () => set({
    activeBusiness: null,
    activeView: 'inbox',
    activePageUrl: null,
    activeMessageId: null,
    showBusinessForm: false,
    showPageForm: false,
    showDocumentUpload: false,
  }),
}))
