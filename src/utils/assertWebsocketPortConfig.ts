import * as vscode from 'vscode'

import { getWebSocketPort } from '../websocket.js'

export default function assertWebsocketPortConfig() {
  const port = getWebSocketPort()

  if (!port) {
    vscode.window
      .showInformationMessage(
        'Restart Roblox Studio Simulator: WebSocket port not configured. Add "restartRobloxStudioSimulator.websocketPort": <port_number> to your workspace settings (.vscode/settings.json) or user settings.',
        'Open Settings',
      )
      .then((selection) => {
        if (selection === 'Open Settings') {
          vscode.commands.executeCommand(
            'workbench.action.openSettings',
            'restartRobloxStudioSimulator.websocketPort',
          )
        }
      })
  }
}
