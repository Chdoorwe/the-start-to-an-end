import random
from PIL import Image, ImageDraw, ImageFont
import os

def create_noise_image(path, text):
    width, height = 400, 300
    img = Image.new('RGB', (width, height), color='black')
    pixels = img.load()

    # Create static noise
    for x in range(width):
        for y in range(height):
            if random.random() > 0.5:
                pixels[x, y] = (random.randint(0, 50), random.randint(0, 50), random.randint(0, 50))

    # Add hidden text (very subtle)
    draw = ImageDraw.Draw(img)
    # Ensure text is bright enough to be seen when brightness is cranked up, 
    # but dark enough to be hidden in the noise normally? 
    # Actually, for the puzzle, we want it to be invisible until brightness/contrast is changed.
    # So we make the text color (10, 10, 10) on a (0,0,0) background?
    # No, the noise is random 0-50.
    # Let's make the text (12, 12, 12) and the background noise low.
    
    font_size = 20
    try:
        font = ImageFont.truetype("arial.ttf", font_size)
    except IOError:
        font = ImageFont.load_default()

    # Overlay text with specific color that stands out when contrast is high
    draw.text((50, 100), text, fill=(15, 15, 15), font=font)
    
    # Save
    os.makedirs(os.path.dirname(path), exist_ok=True)
    img.save(path)
    print(f"Created {path}")

def create_glitch_logo(path):
    width, height = 100, 100
    img = Image.new('RGB', (width, height), color='white')
    draw = ImageDraw.Draw(img)
    
    # Draw simple logo
    draw.rectangle([10, 10, 90, 90], outline='black', width=3)
    draw.text((25, 40), "CHRONOS", fill='black')
    
    # Add simple glitch lines
    for _ in range(10):
        y = random.randint(0, height)
        draw.line([(0, y), (width, y)], fill='red', width=1)
        
    os.makedirs(os.path.dirname(path), exist_ok=True)
    img.save(path)
    print(f"Created {path}")

if __name__ == "__main__":
    create_noise_image("chronos-arg/assets/images/hidden_msg.png", "ADMIN PASS PART 2: OMEG-A9")
    create_glitch_logo("chronos-arg/assets/images/logo_glitch.png")
