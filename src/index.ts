import type * as vscode from 'vscode'

import { getWebSocketPort, startWebSocket } from './websocket.js'
import {
  registerStartCommand,
  registerStopCommand,
  registerRestartCommand,
} from './handlers/commands.js'
import {
  createRestartStatusBarItem,
  createWebSocketStatusBarItem,
} from './handlers/statusBar.js'
import { setupFileSaveListener, setupCleanupOnDeactivate } from './handlers/listeners.js'
import { PACKAGE_NAME } from './constants.js'

export async function activate(context: vscode.ExtensionContext) {
  console.log(`${PACKAGE_NAME} Activated`)
  const port = getWebSocketPort()

  if (port) {
    startWebSocket({
      dontShowInformationMessage: true,
    })
  }

  // Register all commands
  registerStartCommand(context)
  registerStopCommand(context)
  registerRestartCommand(context)

  // Create status bar items
  createRestartStatusBarItem(context)
  createWebSocketStatusBarItem(context)

  // Setup listeners
  setupFileSaveListener(context)
  setupCleanupOnDeactivate(context)
}

export function deactivate() {}
