import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useVaultBusinesses, useVaultBusiness } from '../api/vault-hooks'
import { useVaultStore } from '../stores/vault'
import { VaultSidebar } from '../components/vault/VaultSidebar'
import { VaultContent } from '../components/vault/VaultContent'
import { BusinessFormDialog } from '../components/vault/BusinessFormDialog'
import { PageFormDialog } from '../components/vault/PageFormDialog'
import { DocumentUploadDialog } from '../components/vault/DocumentUploadDialog'
import { Shield, Lock } from 'lucide-react'

export function VaultPage() {
  const [searchParams] = useSearchParams()
  const { data: businesses, isLoading } = useVaultBusinesses()
  const activeBusiness = useVaultStore((s) => s.activeBusiness)
  const setActiveBusiness = useVaultStore((s) => s.setActiveBusiness)

  const { data: detailedBusiness } = useVaultBusiness(activeBusiness?.id)

  useEffect(() => {
    if (detailedBusiness) {
      setActiveBusiness(detailedBusiness)
    }
  }, [detailedBusiness])

  useEffect(() => {
    if (!activeBusiness && businesses && businesses.length > 0) {
      setActiveBusiness(businesses[0])
    }
  }, [businesses, activeBusiness, setActiveBusiness])

  useEffect(() => {
    const success = searchParams.get('success')
    if (success === 'true') {
      const businessId = searchParams.get('business_id')
      if (businessId && businesses) {
        const biz = businesses.find((b) => b.id === businessId)
        if (biz) setActiveBusiness(biz)
      }
    }
  }, [searchParams, businesses, setActiveBusiness])

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <Shield className="size-12 text-vault-accent animate-pulse" />
            <Lock className="size-5 text-vault-accent absolute bottom-0 right-0" />
          </div>
          <span className="text-sm text-text-tertiary font-medium tracking-wide">LOADING VAULT...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex overflow-hidden vault-container">
      <VaultSidebar businesses={businesses || []} />
      <VaultContent />
      <BusinessFormDialog />
      <PageFormDialog />
      <DocumentUploadDialog />
    </div>
  )
}
