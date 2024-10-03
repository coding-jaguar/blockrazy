# Base image with Ganache CLI
FROM trufflesuite/ganache-cli:latest

# Create the /data directory
RUN mkdir -p /data

# Copy the Ganache workspace data into the container
COPY ./ganache_db/curious-babies/chaindata /data

# Ensure proper permissions
# RUN chown -R root:root /data

# Expose Ganache port
EXPOSE 8545

# Start Ganache with the workspace data
CMD ["ganache-cli", "--db", "/data", "-h", "0.0.0.0", "-p", "8545"]
