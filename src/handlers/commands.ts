import * as vscode from 'vscode'

import {
  startWebSocket,
  stopWebSocket,
  broadcast,
  getWebSocketPort,
  hasConnectedClients,
} from '../websocket.js'
import { PACKAGE_NAME } from '../constants.js'
import assertWebsocketPortConfig from '../utils/assertWebsocketPortConfig.js'

type RestartMessage = {
  type: 'restart'
  source: string
  timestamp: number
}

export function registerStartCommand(context: vscode.ExtensionContext) {
  const startCmd = vscode.commands.registerCommand(
    'restartRobloxStudioSimulator.startWebSocket',
    () => {
      startWebSocket()
    },
  )
  context.subscriptions.push(startCmd)
}

export function registerStopCommand(context: vscode.ExtensionContext) {
  const stopCmd = vscode.commands.registerCommand(
    'restartRobloxStudioSimulator.stopWebSocket',
    () => {
      stopWebSocket()
    },
  )
  context.subscriptions.push(stopCmd)
}

export function registerRestartCommand(context: vscode.ExtensionContext) {
  const restartCmd = vscode.commands.registerCommand(
    'restartRobloxStudioSimulator.restart',
    () => {
      console.log(`${PACKAGE_NAME}: Restart command triggered from VS Code`)
      const port = getWebSocketPort()

      if (!port) {
        assertWebsocketPortConfig()
        return
      }

      const msg: RestartMessage = {
        type: 'restart',
        source: 'vscode',
        timestamp: Date.now(),
      }
      broadcast(msg)
      vscode.window.showInformationMessage(
        `Requested Roblox Studio Simulator Restart (Port: ${port})`,
      )

      if (!hasConnectedClients()) {
        vscode.window.showWarningMessage(
          `⚠️ No Roblox Studio clients connected. Make sure the Roblox plugin is connected to port: ${port}`,
        )
      }
    },
  )
  context.subscriptions.push(restartCmd)
}
