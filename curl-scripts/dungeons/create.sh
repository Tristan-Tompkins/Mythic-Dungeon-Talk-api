#!/bin/bash

API="http://localhost:4741"
URL_PATH="/dungeons"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "dungeon": {
      "dungeonName": "'"${DUNGEONNAME}"'",
      "description": "'"${DESCRIPTION}"'"
    }
  }'

echo
