#!/bin/sh

kill_process() {
  PID=`lsof -i TCP:$1 | grep node | grep LISTEN | awk '{print $2}'`
  if [[ "$PID"  != "" ]]; then
    echo "Killed PID: $PID"
    kill -9 $PID
  fi
}

run_in_development_mode() {
  # run backend server
  cd blockon-backend
  nohup yarn dev >> $BACKEND_LOG_PATH &

  # run frontend server
  cd ../blockon-frontend
  nohup yarn start >> $FRONTEND_LOG_PATH &
}

run_in_production_mode() {
  # build react if doesn't exist build directory
  cd blockon-frontend
  if [[ ! -d 'build' ]]; then
    yarn build
  fi

  # run backend server
  cd ../blockon-backend
  nohup yarn start >> $BACKEND_LOG_PATH &
}

# script absolute path
SCRIPTPATH="$( cd "$(dirname "$0")" ; pwd -P )"

# log file path
TODAY=$(date '+%Y-%m-%d')
BACKEND_LOG_PATH="${SCRIPTPATH}/logs/backend-${TODAY}.log"
FRONTEND_LOG_PATH="${SCRIPTPATH}/logs/frontend-${TODAY}.log"

# create log file
mkdir -p logs
touch ${BACKEND_LOG_PATH}
touch ${FRONTEND_LOG_PATH}

# kill process if running on port 3000 or 8000
kill_process 3000
kill_process 8000

# run server in each mode
if [[ $1 == 'dev' ]]; then
  export NODE_ENV=development
  run_in_development_mode
else
  export NODE_ENV=production
  run_in_production_mode
fi

# print log to terminal
tail -f $BACKEND_LOG_PATH $FRONTEND_LOG_PATH