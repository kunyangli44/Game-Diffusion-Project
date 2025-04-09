import numpy as np
from PIL import Image

def generate_image():
    arr = (np.random.rand(128, 128, 3) * 255).astype(np.uint8)
    return Image.fromarray(arr)
