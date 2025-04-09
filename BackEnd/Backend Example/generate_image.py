import numpy as np
from PIL import Image

def generate_image():
    # Create a 128x128 RGB noisy image
    array = np.random.rand(128, 128, 3) * 255
    return Image.fromarray(array.astype('uint8')).convert('RGB')
