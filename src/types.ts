export interface AuthData {
  accessToken: string
  email: string
  displayName?: string
  subscriptionType?: string
}

export interface ClaudeConfig {
  oauthAccount?: {
    accountUuid: string
    emailAddress: string
    organizationUuid: string
    displayName: string
    organizationRole: string
    workspaceRole: string | null
    organizationName: string
  }
}

export interface UsageWindow {
  utilization: number
  resets_at: string | null
}

export interface ClaudeUsage {
  five_hour?: UsageWindow
  seven_day?: UsageWindow
  seven_day_oauth_apps?: UsageWindow
  seven_day_opus?: UsageWindow
}