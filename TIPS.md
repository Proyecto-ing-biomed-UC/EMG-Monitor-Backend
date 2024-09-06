docker exec -it db_ciervo psql -U ciervo_backend_user -d ciervo_backend_db
acceder a la bdd para crear usuarios manualmente
```INSERT INTO users (username, password) VALUES ('ciervo', '$2b$10$EdRi59OLvUX8km64xZRxG.UVR1RhPTt1NNZj/FmAdctdSPUeeXPjS');
```
