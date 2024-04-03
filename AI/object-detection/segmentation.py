import torch
from PIL import Image
import io

from pathlib import Path
# temp = pathlib.PosixPath
# pathlib.PosixPath = pathlib.WindowsPath

def get_yolov5_basic():
    # local best.pt
    model = torch.hub.load('./yolov5', 'custom', path=Path('./model/basic_semi_final.pt'), source='local')  # local repo
    model.conf = 0.5
    return model

def get_yolov5_johnnie():
    # local best.pt
    model = torch.hub.load('./yolov5', 'custom', path=Path('./model/johnnie.pt'), source='local')  # local repo
    model.conf = 0.5
    return model

def get_yolov5_jack():
    # local best.pt
    model = torch.hub.load('./yolov5', 'custom', path=Path('./model/jack.pt'), source='local')  # local repo
    model.conf = 0.5
    return model

def get_yolov5_ballentines():
    # local best.pt
    model = torch.hub.load('./yolov5', 'custom', path=Path('./model/ballentines.pt'), source='local')  # local repo
    model.conf = 0.5
    return model

def get_yolov5_empty():
    # local best.pt
    model = torch.hub.load('./yolov5', 'custom', path=Path('./model/empty.pt'), source='local')  # local repo
    model.conf = 0.5
    return model

def get_image_from_bytes(binary_image, max_size=1024):
    input_image = Image.open(io.BytesIO(binary_image)).convert("RGB")
    width, height = input_image.size
    resize_factor = min(max_size / width, max_size / height)
    resized_image = input_image.resize(
        (
            int(input_image.width * resize_factor),
            int(input_image.height * resize_factor),
        )
    )
    return resized_image
