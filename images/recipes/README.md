# Recipe Images

This directory contains all recipe images used in the application. Each image should follow these requirements:
- Resolution: 800x600 pixels minimum
- Format: JPG
- Aspect ratio: 4:3 or 16:9
- File size: Less than 500KB each
- Style: Professional food photography
- Lighting: Well-lit, natural lighting preferred
- Composition: Centered, appetizing presentation

## Required Images

### Italian Recipes
1. `margherita-pizza.jpg` - Classic Margherita Pizza
2. `carbonara.jpg` - Homemade Pasta Carbonara
3. `lasagna.jpg` - Lasagna alla Bolognese
4. `risotto.jpg` - Risotto ai Funghi

### Mexican Recipes
1. `beef-tacos.jpg` - Beef Tacos
2. `enchiladas.jpg` - Enchiladas Verdes
3. `guacamole.jpg` - Guacamole
4. `pozole.jpg` - Pozole Rojo

### Asian Recipes
1. `pad-thai.jpg` - Chicken Pad Thai
2. `sushi-rolls.jpg` - Sushi Rolls
3. `korean-bbq.jpg` - Korean BBQ Short Ribs
4. `ramen.jpg` - Ramen Noodle Soup
5. `kung-pao.jpg` - Kung Pao Chicken

### Desserts
1. `chocolate-lava.jpg` - Chocolate Lava Cake
2. `vanilla-bean.jpg` - Vanilla Bean Cheesecake
3. `tiramisu.jpg` - Tiramisu
4. `apple-pie.jpg` - Apple Pie
5. `creme-brulee.jpg` - Crème Brûlée

### Mediterranean Recipes
1. `greek-salad.jpg` - Greek Salad
2. `hummus.jpg` - Hummus
3. `moussaka.jpg` - Moussaka
4. `shakshuka.jpg` - Shakshuka
5. `falafel.jpg` - Falafel

### American Recipes
1. `cheeseburger.jpg` - Classic Cheeseburger
2. `mac-and-cheese.jpg` - Mac and Cheese
3. `bbq-pulled-pork.jpg` - BBQ Pulled Pork
4. `buffalo-wings.jpg` - Buffalo Wings
5. `clam-chowder.jpg` - New England Clam Chowder

## Image Naming Convention
- Use lowercase letters
- Use hyphens (-) to separate words
- Be descriptive but concise
- Include the main dish name
- Example: `spicy-chicken-curry.jpg`

## Image Optimization
Before uploading:
1. Resize to appropriate dimensions (800x600 minimum)
2. Optimize file size (< 500KB)
3. Ensure proper color profile (sRGB)
4. Use proper compression (quality 80-90%)

## Directory Structure on Mercury Server
All recipe images should be uploaded to:
`/cos30043/s104181789/A3/images/recipes/`

## File Permissions
After uploading to Mercury server:
```bash
chmod 644 /cos30043/s104181789/A3/images/recipes/*.jpg
chmod 755 /cos30043/s104181789/A3/images/recipes/
``` 