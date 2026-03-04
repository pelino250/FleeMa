# DevOps-j26

DevOps Class demo.

## Hands-on Lab 2: docker-compose.yml

This project includes:

- `web`: a small Flask app
- `db`: a PostgreSQL database

### Project files

- `app.py`
- `requirements.txt`
- `Dockerfile`
- `docker-compose.yml`

### Run the stack

Build and start both services:

```powershell
docker compose up --build
```

Open:

- `http://localhost:5000/` for app status
- `http://localhost:5000/db-check` to write/read from PostgreSQL

### Verify data persistence

1. Call `http://localhost:5000/db-check` a few times and note the `total_rows` value.
2. Stop containers without deleting volumes:

```powershell
docker compose down
```

3. Start again:

```powershell
docker compose up
```

4. Call `http://localhost:5000/db-check` again. `total_rows` should continue from previous value.

### Remove everything including volumes

```powershell
docker compose down -v
```
