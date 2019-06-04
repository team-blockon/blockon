<img src="https://user-images.githubusercontent.com/16279779/46770397-1a65cd80-cd2a-11e8-8f3d-d96792edc076.png" width="270" alt="blockon">

[![Build Status](https://travis-ci.org/team-blockon/blockon.svg?branch=master)](https://travis-ci.org/team-blockon/blockon)

Blockon is real estate contract management platform based on Klaytn.

## Overview

- **랜딩 페이지**

<img src="https://user-images.githubusercontent.com/16279779/58856245-1cc3d000-86dd-11e9-887e-8188d4cc84cc.jpg" width="430" alt="랜딩">

- **중개소 찾기**

<img src="https://user-images.githubusercontent.com/16279779/58856246-1cc3d000-86dd-11e9-9d64-8fd06fed167a.jpg" width="430" alt="중개소찾기">

- **거래 목록**

<img src="https://user-images.githubusercontent.com/16279779/58856250-20575700-86dd-11e9-9320-6574097b2e83.jpg" width="430" alt="거래목록">

- **거래 등록**

<img src="https://user-images.githubusercontent.com/16279779/58856251-20575700-86dd-11e9-9403-d6e900084e83.jpg" width="430" alt="거래등록"> <img src="https://user-images.githubusercontent.com/16279779/58856256-23eade00-86dd-11e9-8043-0a959ae8e00c.jpg" width="430" alt="이중계약 체크">

- **거래 상세**

<img src="https://user-images.githubusercontent.com/16279779/58856265-28af9200-86dd-11e9-8bc0-b0fc9df80b6c.jpg" width="430" alt="거래상세_동의 후">

- **중개인 인증**

<img src="https://user-images.githubusercontent.com/16279779/58856623-213cb880-86de-11e9-8b30-c0f43180a4c7.jpg" width="430" alt="마이페이지 중개인인증 탭_인증 전">

## Demo

<a href="https://youtu.be/2CNuBcWMpg4">
  <img src="https://user-images.githubusercontent.com/16279779/58856890-ceafcc00-86de-11e9-928b-ab5f891bc150.png" width="500" />
</a>

## CI/CD architecture

CI/CD with Travis CI, docker-compose, S3 and CodeDeploy.

<img src="https://user-images.githubusercontent.com/16279779/47846816-8e1c6700-de0c-11e8-8c3f-1eb7d6585e53.png" width="350" alt="Blockon CI/CD">

## Dependency

Blockon has the dependencies for the following libraries:

| Node.js               | MongoDB |
| --------------------- | ------- |
| 8.11.2+ (except 10.x) | 3.6.5+  |

## How to start developing Blockon?

For anyone interested in developing Blockon, follow the instructions below.

### Development Environment

Clone the Blockon repository install the dependency modules.

#### 1. Clone the repository

```bash
# Clone the repository.
$ git clone https://github.com/team-blockon/blockon.git
```

#### 2. Install dependencies

`npm` and `Yarn` are supported.

Run command in `blockon-backend` and `blockon-frontend` directory, respectively.

```bash
# Install the dependency modules.
$ npm install

# or
$ yarn
```

#### 3. Set environment variables

Copy the `.env.example` file and rename it to `.env` (inside `blockon-backend` directory)

And set the `MONGO_URI` and `SECRET_KEY` variable.

#### 4. Build

Use shell script to build Blockon

```bash
# Run webpack-dev-server for development
$ sh start.sh dev

# or production build
$ sh start.sh
```

## License

Blockon is licensed under the [MIT license](LICENSE).
