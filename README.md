# NutriScan_historial_ms
 El microservicio se encarga de realizar la creación, edición, eliminación y lectura del historial de un usuario. Así como también llevar la funcionalidad de agregar la sumatoria de calorías para un perfil específico. 

## Commands to Docker Compile and Run

To build and run the Docker container, use the following commands:

```js
docker build -t nutriscanun-historial-ms .
docker run -d -p 3006:3006 --env-file .env --name nutriscanun-historial-ms-docker nutriscanun-historial-ms
```

## Image Deploy

```js
docker tag nutriscanun-historial-ms juanxo074/nutriscan-store-ms:latest
```
