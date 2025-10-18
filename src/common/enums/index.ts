export enum ACCOUNT_STATUS {
  ACTIVE = "active",
  DEACTIVATED_BY_USER = "deactivated_by_user",
  DEACTIVATED_BY_ADMIN = "deactivated_by_admin",
  SUSPENDED_TEMPORARILY = "suspended_temporarily",
  SUSPENDED_PERMANENT = "suspended_permanent",
  BANNED = "banned",
  LOCKED_TOO_MANY_ATTEMPTS = "locked_too_many_attempts",
  PENDING_EMAIL_VERIFICATION = "pending_email_verification"
}
