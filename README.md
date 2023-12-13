# Pirate Wires


## Local Devlelopment

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Pirate-Wires/pirate-wires
    ```

2. Change into the project directory:

    ```bash
    cd pirate-wires
    ```

3. Install dependencies:

    ```bash
    pnpm install
    ```

### Configuration

#### Doppler Credentials

This project uses Doppler to manage secrets and configurations. You'll need be given access to the Doppler account for the project. Once you have access:

1. Install Doppler CLI:

    ```bash
    npm install -g @dopplerhq/cli
    ```

2. Authenticate Doppler CLI:

    ```bash
    doppler login
    ```

3. After authentication, the project secrets and configurations will be available for local development. Run the following command to fetch secrets and configurations:

    ```bash
    doppler run -- pnpm run fetch-secrets
    ```

### Development

To start the development server, run:

```bash
pnpm run dev
```

Running  `dev`, `build`, and `start`, all will automatically fetch secrets and configurations from Doppler. See package.json for more details.

### Updating Secrets

To update secrets: See [Doppler CLI documentation](https://docs.doppler.com/docs/cli) or use the [Doppler Website GUI](https://dashboard.doppler.com/) to update secrets.


TODO: Add github workflows doumentation including branch naming conventions.
