#!/bin/bash

# set language
if [[ -z $1 ]]; then
    lng="en"
else
    lng="$1"
fi

# parse files and get errors in go files that aren't test files
grep "errors.New(.\+)" -roh . --exclude-dir=node_modules --exclude-dir=portal-ui --include=*.go --exclude=*_test.go | grep "\".\+\"" -o | sort | uniq > out.txt

keysFile='out.txt'
tempJsonFile="temp.json"
fileout="portal-ui/src/locales/$lng/errors.json"

# check if locale exists, and terminate if it doesn't
if [ ! -d "portal-ui/src/locales/$lng" ]; then
  echo "path portal-ui/src/locales/$lng does not exist, choose another locale"
  rm $keysFile
  exit 1
fi


# start writing to json file if it doesn't exist
if [[ ! -f $fileout ]]; then
  echo "{}" > $fileout
fi

# add key-values to json file
while read line; do

  # strip line of outer quotes
  line="${line:1:-1}"

  # if key exists, continue
  value=$(jq --arg key "$line" '.[$key]' $fileout )

  if [[ $value != "null"  ]]; then
    continue
  fi

  # if language isn't english default value is used
  if [[ $lng = "en" ]]; then
    end="$line"
  else
    end="__STRING_NOT_TRANSLATED__"
  fi
  
  # write key-value pairs to json file
  jq -S --arg key "$line" --arg value "$end" '. + {($key): $value}' $fileout > $tempJsonFile
  cat $tempJsonFile > $fileout

done < $keysFile

# remove key-values that are no longer in code
jq 'keys' $fileout | grep "\".\+\"" -o >> $keysFile
sort $keysFile | uniq -u > temp.txt

while read line; do
  # strip line of outer quotes
  line="${line:1:-1}"

  jq --arg key "$line" 'del(.[$key])' $fileout > $tempJsonFile
  cat $tempJsonFile > $fileout

done < temp.txt

rm temp.txt
rm $tempJsonFile
rm $keysFile
