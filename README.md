# NFTS Market Api Microservices
This Project is about a simulation of an NTFS market where users have the ability to simulate uploading their ntfs. In addition to that, other users of the platform are also given the opportunity to buy those assets.

<br>

 ## Content
In this repository there are 3 microservices, one of which is the api-gateway, the main one of the project is the user-service that contains all the user logic. Finally, the notification service that contains some basic emails such as the following: confirm-user, reset-password and welcome for the user.

<br>

## Setup Docker
Visit this page [Docker Docs](https://docs.docker.com/)


<br>

## Installation

```bash
$ npm install
```


## Running the app

```bash
# development
$ docker-compose up
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author of This services - [David Bujosa](https://github.com/bujosa)
- Author of NTFsMarket-Frontend [Jose Sandoval](https://github.com/goritm)
- NTFS Market Organization [Click here](https://github.com/NFTsMarket)

## License

  Nest is [MIT licensed](LICENSE).
