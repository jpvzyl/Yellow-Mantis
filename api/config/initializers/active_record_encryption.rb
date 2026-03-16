Rails.application.config.after_initialize do
  ActiveRecord::Encryption.configure(
    primary_key: ENV.fetch("AR_ENCRYPTION_PRIMARY_KEY", Rails.application.credentials.dig(:active_record_encryption, :primary_key) || "dev-primary-key-change-in-production-32bytes!"),
    deterministic_key: ENV.fetch("AR_ENCRYPTION_DETERMINISTIC_KEY", Rails.application.credentials.dig(:active_record_encryption, :deterministic_key) || "dev-deterministic-key-change-prod!!"),
    key_derivation_salt: ENV.fetch("AR_ENCRYPTION_KEY_DERIVATION_SALT", Rails.application.credentials.dig(:active_record_encryption, :key_derivation_salt) || "dev-salt-change-in-production-now!")
  )
end
