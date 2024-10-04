# Blockchain Voting System

This project consists of a client built with React, an Express.js backend, a MongoDB database, and a Ganache blockchain network. The steps below will guide you through the process of setting up the project using Docker, deploying a smart contract with Hardhat, and interacting with the system.

## Prerequisites

- Docker and Docker Compose installed on your machine.
- Hardhat installed globally or in your local project.

## Steps to Get Started

### 1. Clone the repository

```bash
git clone https://github.com/coding-jaguar/blockrazy.git
cd blockrazy
```

### 2. Build and Start Services

First, build and start the Docker containers for the client, server, MongoDB, and Ganache services:

```bash
docker-compose up --build
```

This will:

- Build the Docker images for the client and server.
- Start MongoDB and Ganache.

### 3. Deploy the Smart Contract to Ganache

Once the containers are running, you need to deploy your smart contract to the Ganache network. Navigate to the `hardhat-project` directory:

```bash
cd hardhat-project
npx hardhat run scripts/deploy.js --network ganache
```

The deployment script will print the **contract address** to the console.

### 4. Configure the `.env` Files

Now that you have the contract address, you need to update the `.env` files with this address.

- **Server `.env` file (`server/.env`)**: Update the `CONTRACT_ADDRESS` environment variable with the deployed contract's address.

Example:

```env
MONGO_URI=mongodb://root:example@mongodb:27017/yourdb?authSource=admin
GANACHE_RPC_URL=http://ganache:8545
CONTRACT_ADDRESS=<deployed_contract_address>
```

- **Client `.env` file (`client/.env`)**: Similarly, update the client `.env` with the same contract address if necessary.

### 5. Rebuild Docker Images

After updating the environment variables, you need to rebuild the Docker images:

```bash
docker-compose up --build
```

### 6. Register the First Admin User

Once the server is running, you can register the first admin user by sending a POST request to the following endpoint:

- **URL**: `http://localhost:5000/users/firstAdmin`
- **Method**: POST
- **Body**: JSON

```json
{
  "username": "root",
  "password": "root",
  "userType": "ADMIN",
  "publicKey": "<admin_public_key>",
  "phoneNumber": "433434334"
}
```

You can use a tool like Postman, Curl, or any HTTP client to send this request. Make sure to replace `<admin_public_key>` with the correct public key from the deployed contract or account.

### 7. Run the Client

Finally, run the client in your browser by navigating to `http://localhost:3000`.

## Summary of Commands:

1. Build and start services:

   ```bash
   docker-compose up --build
   ```

2. Deploy the smart contract:

   ```bash
   cd hardhat-project
   npx hardhat run scripts/deploy.js --network ganache
   ```

3. Update the `.env` files with the contract address.

4. Rebuild the Docker images:

   ```bash
   docker-compose up --build
   ```

5. Register the first admin user via POST request.

6. Access the client at `http://localhost:3000`.
