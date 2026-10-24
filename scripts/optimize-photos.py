"""Web-optimize the three approved lab photos (format conversion + aspect-preserving resize only)."""
import sys, pathlib
from PIL import Image
src = pathlib.Path(sys.argv[1]); out = pathlib.Path(__file__).resolve().parent.parent / "assets/photos"
for name in ["lab-group-edited-v2", "lab-culture-edited-v2", "lab-microscope-edited"]:
    im = Image.open(src / f"{name}.png").convert("RGB")
    im.save(out / f"{name}.webp", "WEBP", quality=86, method=6)
    print(name, im.size)
