import * as vscode from 'vscode'
import { ClaudeUsage, AuthData } from '../types'
import {
  createMainTooltip,
  createAuthRequiredTooltip,
  createAuthErrorTooltip,
  createUpdatingTooltip,
  createFetchErrorTooltip,
  createUpdateErrorTooltip,
} from './tooltip-builder'

let statusBarItem: vscode.StatusBarItem

/**
 * Create and initialize the status bar item
 */
export function createStatusBarItem(): vscode.StatusBarItem {
  statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100,
  )

  statusBarItem.text = '$(claude-icon) $(sync~spin)'
  statusBarItem.tooltip = 'Initializing Claude Stats Monitor...'
  statusBarItem.command = 'claude-usage.noop'
  statusBarItem.show()

  return statusBarItem
}

/**
 * Update status bar with usage data
 */
export function updateStatusBar(usage: ClaudeUsage, authData: AuthData) {
  const fiveHourPercent = usage.five_hour?.utilization || 0
  const sevenDayPercent = usage.seven_day?.utilization || 0

  // Show the highest usage percentage
  const displayPercent = Math.max(fiveHourPercent, sevenDayPercent)

  statusBarItem.text = `$(claude-icon) ${displayPercent.toFixed(0)}%`
  statusBarItem.color = undefined
  statusBarItem.backgroundColor = undefined

  statusBarItem.tooltip = createMainTooltip(usage, authData)
}

/**
 * Show authentication required state
 */
export function showAuthRequired() {
  statusBarItem.text = '$(error)'
  statusBarItem.color = new vscode.ThemeColor('errorForeground')
  statusBarItem.tooltip = createAuthRequiredTooltip()
  statusBarItem.command = 'claude-usage.noop'
}

/**
 * Show authentication error state
 */
export function showAuthError(error: any) {
  statusBarItem.text = '$(error)'
  statusBarItem.color = new vscode.ThemeColor('errorForeground')
  statusBarItem.tooltip = createAuthErrorTooltip(error)
}

/**
 * Show updating state
 */
export function showUpdating() {
  statusBarItem.text = '$(claude-icon) $(sync~spin)'
  statusBarItem.color = undefined
  statusBarItem.tooltip = createUpdatingTooltip()
}

/**
 * Show fetch error state
 */
export function showFetchError() {
  statusBarItem.text = '$(warning)'
  statusBarItem.color = new vscode.ThemeColor('editorWarning.foreground')
  statusBarItem.tooltip = createFetchErrorTooltip()
}

/**
 * Show update error state
 */
export function showUpdateError(error: any) {
  statusBarItem.text = '$(warning)'
  statusBarItem.color = new vscode.ThemeColor('editorWarning.foreground')
  statusBarItem.tooltip = createUpdateErrorTooltip(error)
}

/**
 * Get the status bar item
 */
export function getStatusBarItem(): vscode.StatusBarItem {
  return statusBarItem
}
