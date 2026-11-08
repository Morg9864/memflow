# Narration via ElevenLabs, voice xgJyhAugJB6JKenNlaNw ("Perle"), with character alignment → word timings.
# Key read from ~/.config/elevenlabs/api_key (never stored in the project).
import json, base64, os, sys, urllib.request, re
here = os.path.dirname(os.path.abspath(__file__))
root = os.path.dirname(here)
text = open(os.path.join(here, "script.txt"), encoding="utf-8").read().strip()
key = open(os.path.expanduser("~/.config/elevenlabs/api_key")).read().strip()
body = {"text": text, "model_id": "eleven_multilingual_v2", "language_code": "fr",
        "voice_settings": {"stability": 0.55, "similarity_boost": 0.8, "style": 0.15, "use_speaker_boost": True, "speed": float(sys.argv[1]) if len(sys.argv) > 1 else 1.0}}
req = urllib.request.Request("https://api.elevenlabs.io/v1/text-to-speech/xgJyhAugJB6JKenNlaNw/with-timestamps?output_format=mp3_44100_192",
                             data=json.dumps(body).encode(), headers={"xi-api-key": key, "Content-Type": "application/json"})
d = json.load(urllib.request.urlopen(req))
open(os.path.join(root, "assets/audio/voiceover.mp3"), "wb").write(base64.b64decode(d["audio_base64"]))
a = d["alignment"]
chars, st, en = a["characters"], a["character_start_times_seconds"], a["character_end_times_seconds"]
words, cur = [], None
for c, s, e in zip(chars, st, en):
    if re.match(r"[\w’'-]", c):
        if cur is None: cur = {"w": "", "start": s}
        cur["w"] += c; cur["end"] = e
    elif cur is not None:
        words.append(cur); cur = None
if cur: words.append(cur)
json.dump({"voice_id": "xgJyhAugJB6JKenNlaNw", "model": body["model_id"], "text": text, "words": [{**w, "start": round(w["start"], 3), "end": round(w["end"], 3)} for w in words]},
          open(os.path.join(here, "voiceover.words.json"), "w"), ensure_ascii=False, indent=1)
print(len(words), "words, ends at", round(words[-1]["end"], 2), "s")
