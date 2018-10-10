# Blockon

Blockon is real estate contract management platform based on Ethereum.

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
$ git clone https://github.com/proj-blockon/integrated-repo.git
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
