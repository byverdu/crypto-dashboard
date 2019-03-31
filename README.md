![node](https://img.shields.io/badge/node-%3E%3D%207.0.0-blue.svg) [![Build Status](https://travis-ci.org/byverdu/crypto-dashboard.svg?branch=development)](https://travis-ci.org/byverdu/crypto-dashboard) ![coverage](./coverage.svg)
![apm](https://img.shields.io/apm/l/vim-mode.svg)

# Crypto Dashboard

webApp where you can see your crypto portfolio.

## Install

1. Clone repo

```bash
> git clone https://github.com/byverdu/crypto-dashboard.git
```

2. Run Docker

```bash
> sudo docker-compose up --build
```

3. Visit [http://localhost:3040](http://localhost:3040)

### Docker commands

**The following only builds the images, does not start the containers:**

`docker-compose build`

**The following builds the images if the images *do not exist* and starts the containers:**

`docker-compose up`

**If you add the --build option, it is forced to build the images even when not needed:**

`docker-compose up --build`

**The following skips the image build process:**

`docker-compose up --no-build`

**If the images aren’t built beforehand, it fails. (edited)**

`docker system prune -a --volumes`