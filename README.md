# AUT SDM 2020/02 Team 8 App

MERN stack with Docker

## Development

```
docker-compose up
```

For development, the `server/` and `client/` directories have their own docker containers, which are configured via the `docker-compose.yml` file.

The client server is spun up at `localhost:3000` and it proxies internally to the server using the linked name as `server:8080`.

The local directories are mounted into the containers, so changes will reflect immediately. However, changes to package.json will likely need to a rebuild: `docker-compose down && docker-compose build && docker-compose up`.

## Testing

```
docker-compose run client npm test
docker-compose run server npm test
```

## Production

The app is deployed to Heroku at http://sdmteam8.herokuapp.com/

### Notes

#### Boilerplate repo

https://github.com/mrcoles/node-react-docker-compose