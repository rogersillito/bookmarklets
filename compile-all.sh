#!/usr/bin/env bash

EXIT_STATUS=0

for f in `ls src/*.js`; do
    filename=$(basename "$f")
    compiled="compiled/$filename"
    bookmarklet "$f" "$compiled"
    if [ $? = 0 ]; then
        printf "Wrote:\033[0;36m ${compiled} \033[0m\n"
    else
        printf "\033[0;31m!! \033[0mEXCEPTION PARSING ${filename}\n"
        EXIT_STATUS=1
    fi
done

printf "\033[0;32mDone\033[0m\n"
exit $EXIT_STATUS
