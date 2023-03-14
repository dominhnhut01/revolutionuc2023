import re
from shapely.geometry import Polygon
from collections import defaultdict

def parse_components_from_string(text):
    amount = []
    unit = []
    for elem in text:
        if len(elem) == 0:  continue
        if elem == '.' or elem.isdigit():
            amount.append(elem)
        else:
            unit.append(elem)
    if len(amount) == 0: return None
    return float("".join(amount))

def in_range(num1, num2, range):
    return abs(num1 - num2) < range
  
def detect_text(path):
    """Detects text in the file."""
    from google.cloud import vision
    import io
    
    client = vision.ImageAnnotatorClient()

    with io.open(path, 'rb') as image_file:
        content = image_file.read()

    image = vision.Image(content=content)

    response = client.text_detection(image=image)
    texts = response.text_annotations
    if not texts: return {}
    lines = texts[0].description
    lines = lines.split('\n')
    line_idx = 0
    nutrtion_dict = {} #category: [amount, unit]
    while line_idx < len(lines) and "calories" not in lines[line_idx].lower():
        line_idx+=1
    line_idx+=1
    while line_idx < len(lines) and 'potassium' not in lines[line_idx-1].lower():
        line = lines[line_idx]
        components = line.split(' ')

        try:
            amount_unit = components[-1]
            # amount = "".join([char for char in amount_unit if (char.isdigit() or char == '.')])
            # unit = "".join([char for char in amount_unit if not char.isdigit()])
            amount = parse_components_from_string(amount_unit)
            if not components[:-1] or not amount:
                raise Exception("OCR error")
            if amount != None:
                key = ' '.join(components[:-1]) if len(components) <= 3 else ' '.join(components[:2])
                nutrtion_dict[key] = amount
        except:
            pass
        line_idx+=1

    calories_box = [[],[]]
    max_area = 0
    for text in texts:
        if text.description.lower().strip() == "calories":
            x = [vertex.x for vertex in text.bounding_poly.vertices]
            y = [vertex.y for vertex in text.bounding_poly.vertices]
            
            pgon = Polygon(zip(x, y))
            if len(calories_box[0]) == 0:
                calories_box = [x,y]
                max_area = pgon.area
            else:
                if pgon.area < max_area: continue
                calories_box = [x,y]
                max_area = pgon.area

    calorie_val = ""
    for text in texts:
        y = [vertex.y for vertex in text.bounding_poly.vertices]
        if in_range(y[0], calories_box[1][0], 50) \
            and in_range(y[1], calories_box[1][1], 50) \
            and in_range(y[2], calories_box[1][2], 50) \
            and in_range(y[3], calories_box[1][3], 50) \
            and text.description.lower().strip() != "calories" \
            and text.description.lower().strip().isdigit():
            calorie_val = text.description

    if calorie_val != "":
        nutrtion_dict['Calories'] = int(calorie_val)
    return nutrtion_dict
detect_text('image.jpeg')