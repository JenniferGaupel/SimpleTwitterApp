#!/bin/bash
set -e

# fixes Rails-specific issue that prevents server from restarting.
# https://docs.docker.com/compose/rails/
# Remove a potentially pre-existing server.pid for Rails.
rm -f /simpleTwitterApp/tmp/pids/server.pid

# Then exec the container's main process (what's set as CMD in the Dockerfile).
exec "$@"