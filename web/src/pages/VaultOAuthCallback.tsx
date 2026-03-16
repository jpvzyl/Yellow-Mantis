import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { CheckCircle2, XCircle } from 'lucide-react'

export function VaultOAuthCallback() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const success = searchParams.get('success')
  const error = searchParams.get('error')
  const businessId = searchParams.get('business_id')

  useEffect(() => {
    const timer = setTimeout(() => {
      if (success) {
        navigate(`/vault?success=true&business_id=${businessId}`, { replace: true })
      } else {
        navigate('/vault', { replace: true })
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [success, businessId, navigate])

  return (
    <div className="h-screen flex items-center justify-center bg-vault-bg">
      <div className="text-center">
        {success ? (
          <>
            <CheckCircle2 className="size-12 text-green-400 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-vault-text-primary mb-2">Account Connected</h2>
            <p className="text-sm text-vault-text-secondary">Redirecting to your vault...</p>
          </>
        ) : (
          <>
            <XCircle className="size-12 text-red-400 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-vault-text-primary mb-2">Connection Failed</h2>
            <p className="text-sm text-vault-text-secondary">{error || 'Something went wrong. Please try again.'}</p>
          </>
        )}
      </div>
    </div>
  )
}
