#!/bin/bash

API="http://localhost:4741"
URL_PATH="/dungeons"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "dungeon": {
    "dungeonName": "'"${DUNGEONNAME}"'",
    "description": "'"${DESCRIPTION}"'"
    }
  }'

echo
