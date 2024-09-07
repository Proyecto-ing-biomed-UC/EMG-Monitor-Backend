docker exec -it db_ciervo psql -U ciervo_backend_user -d ciervo_backend_db
acceder a la bdd para crear usuarios manualmente
```INSERT INTO users (username, password) VALUES ('ciervo', '$2b$10$EdRi59OLvUX8km64xZRxG.UVR1RhPTt1NNZj/FmAdctdSPUeeXPjS');
```
Lo anterior es con el fin de poder insertar en la base de datos el usuario llamado ciervo y crearlo con la contraseña: "monitoreo2024" o "ciervomonitoreo2024" para ello se accede al contenedor que esta en ejecución y accedemos a la base de datos en postgres para la creación del usuario