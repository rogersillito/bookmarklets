#!/usr/bin/env bash

EXIT_STATUS=0

# Ensure a file path is passed
if [ $# -lt 1 ] || [ -z "$1" ]; then
    echo "Usage: $0 <path-to-js-file>"
    exit 1
fi

filepath="src/$1.js"
compiled="compiled/$1.js"
bookmarklet "$filepath" "$compiled"
if [ $? = 0 ]; then
    printf "Wrote:\033[0;36m ${compiled} \033[0m\n"
else
    printf "\033[0;31m!! \033[0mEXCEPTION PARSING ${filename}\n"
    EXIT_STATUS=1
fi

printf "\033[0;32mDone\033[0m\n"
exit $EXIT_STATUS
