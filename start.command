#!/bin/bash
# Stemless launcher (Mac) — starts the app and opens it in your default browser.
# Close the terminal window to stop the server.
cd "$(dirname "$0")" || exit 1
PORT=8000

if ! command -v python3 >/dev/null 2>&1; then
  echo "python3 was not found. Install Xcode Command Line Tools (xcode-select --install),"
  echo "then double-click start.command again."
  read -r -p "Press Return to close..."
  exit 1
fi

echo "Starting Stemless at http://localhost:$PORT"
echo "Close this terminal window to stop the server."
(sleep 1 && open "http://localhost:$PORT") &
exec python3 server.py "$PORT"
