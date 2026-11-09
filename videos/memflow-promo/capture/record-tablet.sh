#!/bin/bash
# Records real touch sessions on the connected Memflow tablet app (Galaxy Tab S10 Lite, 1320x2112) via adb.
# Each tap is logged with its time (seconds from the recording start) and screen position → capture/tablet/<take>.events.json
# Usage: capture/record-tablet.sh <take>   (the app must sit on the screen the take starts from)
set -euo pipefail
cd "$(dirname "$0")/.."
TAKE=$1
EV=capture/tablet/$TAKE.events.json
T0=0
now() { python3 -c 'import time;print(f"{time.time():.3f}")'; }
events=()
tap() { # x y label
  local t; t=$(python3 -c "print(f'{$(now)-$T0:.3f}')")
  adb shell input tap "$1" "$2"
  events+=("{\"label\":\"$3\",\"t\":$t,\"x\":$1,\"y\":$2}")
}
swipe() { # x1 y1 x2 y2 ms label
  local t; t=$(python3 -c "print(f'{$(now)-$T0:.3f}')")
  adb shell input swipe "$1" "$2" "$3" "$4" "$5"
  events+=("{\"label\":\"$6\",\"t\":$t,\"x\":$1,\"y\":$2,\"x2\":$3,\"y2\":$4,\"ms\":$5}")
}
adb shell rm -f /sdcard/mf-take.mp4
adb shell screenrecord --bit-rate 30000000 /sdcard/mf-take.mp4 & REC=$!
sleep 0.8; T0=$(now)
case $TAKE in
  flashcard) # Home → Biologie → Étudier → Flashcard → reveal → Correct → next card
    sleep 1.6; tap 1000 1050 open-collection
    sleep 2.2; tap 721 2011 study
    sleep 2.0; tap 390 1260 mode-flashcard
    sleep 2.6; tap 660 2005 reveal
    sleep 2.4; tap 816 1990 rate-correct
    sleep 2.2 ;;
  qcm) # collection page → Étudier → QCM → answer → Correct
    sleep 1.2; tap 721 2011 study
    sleep 2.0; tap 390 1016 mode-qcm
    sleep 0.6
    read -r QX QY < <(adb shell uiautomator dump /sdcard/ui.xml >/dev/null 2>&1; adb exec-out cat /sdcard/ui.xml | python3 -c "
import sys,re
m=re.search(r'content-desc=\"[A-D]\\. Le chloroplaste\"[^>]*bounds=\"\\[(\\d+),(\\d+)\\]\\[(\\d+),(\\d+)\\]', sys.stdin.read())
a=list(map(int,m.groups())); print((a[0]+a[2])//2, (a[1]+a[3])//2)")
    sleep 0.4; tap "$QX" "$QY" answer
    sleep 2.4; tap 816 1990 rate-correct
    sleep 2.0 ;;
esac
adb shell pkill -INT screenrecord || true
wait $REC || true
sleep 1
adb pull /sdcard/mf-take.mp4 capture/tablet/raw/$TAKE.mp4
adb shell rm -f /sdcard/mf-take.mp4
( IFS=,; echo "{\"screen\":[1320,2112],\"note\":\"t is seconds from host clock start; see offset\",\"events\":[${events[*]}]}" ) > "$EV"
echo "recorded $TAKE"; cat "$EV"
