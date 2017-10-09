
export PATH=/usr/local/bin:$PATH
bing="http://www.bing.com"
url="http://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=en-WW"
DATE=`date +%Y%m%d`
echo $DATE
stamp=`date`

imageURL=$bing$(echo $(curl -s $url) | jq '.images[0].url' | tr -d '"')



while true
do

  nc -z 8.8.8.8 53 ? /dev/null 2 >&1
  online=$?

  if [ $online -eq 0 ]; then
    echo "File is not updated. Downloading Image from Bing ......"
    wget $imageURL -O ~/.bing/$DATE.jpg
    echo $imageURL
    echo "Download Complete. Saved"
    cp ~/.bing/$DATE.jpg ~/.bing/wallpaper.jpg

    osascript -e 'tell application "Finder" to set desktop picture to POSIX file  "/Users/dineshadhithya/.bing/wallpaper.jpg"'
    node /Users/dineshadhithya/.bing/nodemail/mail.js

    break
  else
    echo "Offline"

  sleep 10

  fi

done
