# Background music via ElevenLabs Music (key in ~/.config/elevenlabs/api_key, never stored in the project).
import json, os, urllib.request, urllib.error
here = os.path.dirname(os.path.abspath(__file__))
key = open(os.path.expanduser("~/.config/elevenlabs/api_key")).read().strip()
prompt = ("Warm, calm and hopeful instrumental bed for a study app video. Soft felt piano and light fingerpicked acoustic guitar, "
          "gentle brushed percussion, warm bass, 94 BPM, major key. Starts already gently present (no long intro), steady and unobtrusive "
          "under a female French voiceover, a slight lift around 28 seconds, resolves to a clean ending at 37 seconds. No vocals.")
body = {"prompt": prompt, "music_length_ms": 37000, "model_id": "music_v1", "force_instrumental": True}
req = urllib.request.Request("https://api.elevenlabs.io/v1/music?output_format=mp3_44100_192", data=json.dumps(body).encode(),
                             headers={"xi-api-key": key, "Content-Type": "application/json"})
try:
    data = urllib.request.urlopen(req, timeout=300).read()
except urllib.error.HTTPError as e:
    raise SystemExit(f"ElevenLabs music error {e.code}: {e.read().decode()[:400]}")
out = os.path.join(os.path.dirname(here), "assets/audio/music.mp3")
open(out, "wb").write(data)
json.dump({"provider": "elevenlabs-music", "model": body["model_id"], "prompt": prompt, "length_ms": body["music_length_ms"]}, open(os.path.join(here, "music.json"), "w"), indent=1)
print("wrote", out, len(data), "bytes")
