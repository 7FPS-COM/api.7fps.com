# api.7fps.com
[Backend] Useful tools for fortnite competitive players

Create `.env` file in the root directory and add these rows
```sh
# ------------- fortnite-api-server -------------
FORTNITE_API_SERVER_PORT="1000"
FORTNITE_API_KEY="00000000-00000000-00000000-00000000" # https://fortniteapi.io/
DB_FORTNITE_HOST="localhost"
DB_FORTNITE_PORT="5432"
DB_FORTNITE_NAME="fortniteapi"
DB_FORTNITE_USER="postgres"
DB_FORTNITE_PASSWORD="admin1"
SECONDS_BETWEEN_UPDATES=600

# --------------- main-api-server ---------------
MAIN_API_SERVER_PORT="4000"
DB_USERS_HOST="localhost"
DB_USERS_PORT="5432"
DB_USERS_NAME="users"
DB_USERS_USER="postgres"
DB_USERS_PASSWORD="admin1"

CLIENT_DOMAIN_NAME="http://localhost:3000" # is using for redirects


DISCORD_CLIENT_ID="000000000000000000"                     # https://discord.com/developers/applications/
DISCORD_CLIENT_SECRET="00000000000000000000000000000000"   # https://discord.com/developers/applications/
DISCORD_GENERATED_URL="https://discord.com/api/oauth2/authorize?client_id=000000000000000000&redirect_uri=http%3A%2F%2Flocalhost%3A4000%2Flogin&response_type=code&scope=identify"
DISCORD_REDIRECT_URL="http://localhost:4000/login"
```
