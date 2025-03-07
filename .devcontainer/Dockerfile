FROM node:22.14-bookworm

# Ensure the workspace directory exists and is owned by the node user
WORKDIR /home/node/app
RUN mkdir -p /home/node/resume && chown -R node:node /home/node/resume

# Switch to the node user (UID 1000)
USER node