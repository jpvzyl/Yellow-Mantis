import { useState } from 'react'
import { useAuthStore } from '../stores/auth'
import { useCompanyMembers, useAddCompanyMember, useUpdateCompanyMember, useRemoveCompanyMember, useCreateCompany } from '../api/hooks'
import { Shield, UserPlus, Trash2, Building2 } from 'lucide-react'
import { clsx } from 'clsx'
import type { CompanyMember } from '../types'

function AddUserDialog({ companyId, onClose }: { companyId: string; onClose: () => void }) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('member')
  const addMember = useAddCompanyMember(companyId)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await addMember.mutateAsync({ email, name: name || undefined, password: password || undefined, role })
      onClose()
    } catch {
      // error handled by mutation
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-surface-secondary border border-border-primary rounded-xl p-6 w-full max-w-md shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-lg font-semibold text-text-primary mb-4">Add User to Company</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {addMember.isError && (
            <div className="text-sm text-priority-urgent bg-priority-urgent/10 border border-priority-urgent/20 rounded-lg px-3 py-2">
              {(addMember.error as Error).message}
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1.5">Email *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-surface-tertiary border border-border-primary rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-tertiary outline-none focus:border-accent transition-colors"
              placeholder="user@example.com"
              required
            />
            <p className="text-[11px] text-text-tertiary mt-1">If this email already exists, they will be added to the company.</p>
          </div>

          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1.5">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-surface-tertiary border border-border-primary rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-tertiary outline-none focus:border-accent transition-colors"
              placeholder="John Doe"
            />
            <p className="text-[11px] text-text-tertiary mt-1">Required for new users. Ignored if user already exists.</p>
          </div>

          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1.5">Password</label>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-surface-tertiary border border-border-primary rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-tertiary outline-none focus:border-accent transition-colors"
              placeholder="Leave blank to auto-generate"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1.5">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-surface-tertiary border border-border-primary rounded-lg px-3 py-2 text-sm text-text-primary outline-none focus:border-accent transition-colors"
            >
              <option value="member">Member</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary rounded-lg hover:bg-surface-hover transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={addMember.isPending}
              className="px-4 py-2 text-sm font-medium text-white bg-accent rounded-lg hover:bg-accent-hover transition-colors disabled:opacity-50"
            >
              {addMember.isPending ? 'Adding...' : 'Add User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function CreateCompanyDialog({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [color, setColor] = useState('#6366f1')
  const createCompany = useCreateCompany()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createCompany.mutateAsync({ name, description: description || undefined, color })
      onClose()
    } catch {
      // error handled by mutation
    }
  }

  const colors = ['#6366f1', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#ef4444', '#8b5cf6', '#06b6d4']

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-surface-secondary border border-border-primary rounded-xl p-6 w-full max-w-md shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-lg font-semibold text-text-primary mb-4">Create Company</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {createCompany.isError && (
            <div className="text-sm text-priority-urgent bg-priority-urgent/10 border border-priority-urgent/20 rounded-lg px-3 py-2">
              {(createCompany.error as Error).message}
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1.5">Company Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-surface-tertiary border border-border-primary rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-tertiary outline-none focus:border-accent transition-colors"
              placeholder="Acme Inc."
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1.5">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className="w-full bg-surface-tertiary border border-border-primary rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-tertiary outline-none focus:border-accent transition-colors resize-none"
              placeholder="Brief description..."
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1.5">Color</label>
            <div className="flex gap-2">
              {colors.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={clsx(
                    'size-8 rounded-lg transition-all',
                    color === c ? 'ring-2 ring-offset-2 ring-offset-surface-secondary ring-accent scale-110' : 'hover:scale-105'
                  )}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary rounded-lg hover:bg-surface-hover transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createCompany.isPending}
              className="px-4 py-2 text-sm font-medium text-white bg-accent rounded-lg hover:bg-accent-hover transition-colors disabled:opacity-50"
            >
              {createCompany.isPending ? 'Creating...' : 'Create Company'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function MemberRow({ member, companyId, isCurrentUser }: { member: CompanyMember; companyId: string; isCurrentUser: boolean }) {
  const [confirmDelete, setConfirmDelete] = useState(false)
  const updateMember = useUpdateCompanyMember(companyId)
  const removeMember = useRemoveCompanyMember(companyId)

  return (
    <div className="flex items-center gap-3 px-4 py-3 border-b border-border-primary last:border-0 hover:bg-surface-hover/50 transition-colors">
      <div className="size-9 rounded-full bg-accent/20 flex items-center justify-center text-accent font-semibold text-sm shrink-0">
        {member.user.display_name?.[0]?.toUpperCase() || member.user.email[0].toUpperCase()}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-text-primary truncate">
          {member.user.display_name || member.user.name}
          {isCurrentUser && <span className="text-accent text-[10px] ml-1.5">(you)</span>}
        </div>
        <div className="text-xs text-text-tertiary truncate">{member.user.email}</div>
      </div>
      <select
        value={member.role}
        onChange={(e) => updateMember.mutate({ id: member.id, role: e.target.value })}
        disabled={isCurrentUser}
        className={clsx(
          'bg-surface-tertiary border border-border-primary rounded-lg px-2.5 py-1 text-xs outline-none focus:border-accent transition-colors',
          isCurrentUser ? 'opacity-50 cursor-not-allowed' : ''
        )}
      >
        <option value="member">Member</option>
        <option value="admin">Admin</option>
      </select>
      {!isCurrentUser && (
        confirmDelete ? (
          <div className="flex items-center gap-1">
            <button
              onClick={() => removeMember.mutate(member.id)}
              className="text-xs text-priority-urgent hover:text-priority-urgent/80 font-medium px-2 py-1 rounded hover:bg-priority-urgent/10 transition-colors"
            >
              Confirm
            </button>
            <button
              onClick={() => setConfirmDelete(false)}
              className="text-xs text-text-tertiary px-2 py-1"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setConfirmDelete(true)}
            className="text-text-tertiary hover:text-priority-urgent transition-colors p-1.5 rounded hover:bg-priority-urgent/10"
          >
            <Trash2 className="size-3.5" />
          </button>
        )
      )}
    </div>
  )
}

export function AdminPage() {
  const currentCompany = useAuthStore((s) => s.currentCompany)
  const currentUser = useAuthStore((s) => s.user)
  const [showAddUser, setShowAddUser] = useState(false)
  const [showCreateCompany, setShowCreateCompany] = useState(false)
  const { data: members, isLoading } = useCompanyMembers(currentCompany?.id || '')

  if (!currentCompany) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <Building2 className="size-12 text-text-tertiary mx-auto mb-3" />
          <h2 className="text-lg font-semibold text-text-primary mb-1">No Company Selected</h2>
          <p className="text-sm text-text-secondary mb-4">Create or select a company to manage users.</p>
          <button
            onClick={() => setShowCreateCompany(true)}
            className="px-4 py-2 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent-hover transition-colors"
          >
            Create Company
          </button>
          {showCreateCompany && <CreateCompanyDialog onClose={() => setShowCreateCompany(false)} />}
        </div>
      </div>
    )
  }

  if (currentCompany.role !== 'admin') {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <Shield className="size-12 text-text-tertiary mx-auto mb-3" />
          <h2 className="text-lg font-semibold text-text-primary mb-1">Access Denied</h2>
          <p className="text-sm text-text-secondary">Only company admins can manage users.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-semibold text-text-primary">User Management</h1>
            <p className="text-sm text-text-secondary mt-0.5">
              Manage users for <span className="font-medium text-text-primary">{currentCompany.name}</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowCreateCompany(true)}
              className="flex items-center gap-1.5 px-3 py-2 text-sm text-text-secondary border border-border-primary rounded-lg hover:bg-surface-hover hover:text-text-primary transition-colors"
            >
              <Building2 className="size-3.5" />
              New Company
            </button>
            <button
              onClick={() => setShowAddUser(true)}
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-white bg-accent rounded-lg hover:bg-accent-hover transition-colors"
            >
              <UserPlus className="size-3.5" />
              Add User
            </button>
          </div>
        </div>

        <div className="bg-surface-secondary border border-border-primary rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-border-primary bg-surface-tertiary/50">
            <div className="flex items-center gap-2 text-xs font-medium text-text-tertiary uppercase tracking-wider">
              <span className="flex-1">User</span>
              <span className="w-28 text-center">Role</span>
              <span className="w-20 text-center">Actions</span>
            </div>
          </div>

          {isLoading ? (
            <div className="px-4 py-8 text-center text-sm text-text-tertiary">Loading members...</div>
          ) : members?.length ? (
            members.map((member) => (
              <MemberRow
                key={member.id}
                member={member}
                companyId={currentCompany.id}
                isCurrentUser={member.user.id === currentUser?.id}
              />
            ))
          ) : (
            <div className="px-4 py-8 text-center text-sm text-text-tertiary">No members yet. Add your first user.</div>
          )}
        </div>

        <div className="mt-6 bg-surface-secondary border border-border-primary rounded-xl p-4">
          <h3 className="text-sm font-medium text-text-primary mb-2">Company Details</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-text-tertiary">Name:</span>
              <span className="ml-2 text-text-primary">{currentCompany.name}</span>
            </div>
            <div>
              <span className="text-text-tertiary">Slug:</span>
              <span className="ml-2 text-text-primary font-mono text-xs">{currentCompany.slug}</span>
            </div>
            <div>
              <span className="text-text-tertiary">Your Role:</span>
              <span className="ml-2 text-accent font-medium capitalize">{currentCompany.role}</span>
            </div>
            <div>
              <span className="text-text-tertiary">Members:</span>
              <span className="ml-2 text-text-primary">{members?.length || 0}</span>
            </div>
          </div>
        </div>
      </div>

      {showAddUser && <AddUserDialog companyId={currentCompany.id} onClose={() => setShowAddUser(false)} />}
      {showCreateCompany && <CreateCompanyDialog onClose={() => setShowCreateCompany(false)} />}
    </div>
  )
}
