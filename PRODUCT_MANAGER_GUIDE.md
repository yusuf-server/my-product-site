# Product Manager Usage Guide

## 📋 Overview
The Product Manager is a web-based interface that allows you to easily add new products to your luxury handbag website and export the updated JSON data.

## 🚀 How to Access
1. Start your local server: `python3 -m http.server 8000 --bind 127.0.0.1`
2. Open your browser and go to: `http://127.0.0.1:8000/product-manager.html`

## 🎯 Main Features

### 1. Add New Product
Click the **"Add New Product"** button to open the product form.

#### Required Fields:
- **Product Title**: The main name of the product (e.g., "Classic Luxury Handbag")
- **Subtitle**: A descriptive subtitle (e.g., "Premium Leather Collection")
- **Brand**: Select from available luxury brands (Hermès, Chanel, Louis Vuitton, Gucci, Prada)
- **Size**: Choose from Mini, Small, Medium, Large
- **Price Range**: Medium ($1000-$5000) or High ($5000+)
- **Color**: Select the primary color
- **Main Image URL**: The primary product image (800x800px recommended)

#### Optional Fields:
- **Gallery Images**: Additional product images (minimum 4 recommended)
- **Product Description**: Detailed description of the product
- **Product Features**: Key selling points (one per line)
- **Product Specifications**: Custom specifications (Material, Weight, Origin, Warranty)
- **Featured Product**: Check if this is a bestseller
- **Rating**: Star rating (1-5)
- **Number of Reviews**: Customer review count

### 2. Image URLs
For best results, use high-quality images from Unsplash:
- Main image: `https://images.unsplash.com/photo-[ID]?w=800&h=800&fit=crop`
- Gallery images: Enter each URL on a new line
- Thumbnail will be auto-generated

### 3. Product Features
Enter features one per line, such as:
```
Premium genuine leather
Handcrafted excellence
Multi-functional design
Timeless classic style
```

### 4. Product Specifications
You can customize product specifications or leave empty for auto-generation:
- **Material**: Will auto-fill based on selected brand (e.g., Hermès → Genuine Leather)
- **Weight**: Will auto-fill based on selected size (e.g., Medium → 0.8kg)
- **Origin**: Will auto-fill based on selected brand (e.g., Chanel → France)
- **Warranty**: Default is "2 years" but you can customize

### 5. Gallery Images
- Enter only the images you want to display
- If you provide fewer than 4 images, only those will be shown
- No automatic image padding or placeholder images

## 📤 Export and Update Process

### Step 1: Export JSON Data
1. Click **"Export JSON Data"** button
2. The system will generate updated JSON with all products
3. Click **"Copy to Clipboard"** to copy the JSON data

### Step 2: Update products.json File
1. Open your `products.json` file in a text editor
2. Replace the entire content with the copied JSON data
3. Save the file

### Step 3: Commit Changes to GitHub
```bash
git add products.json
git commit -m "Add new product: [Product Name]"
git push origin main
```

### Step 4: Deploy to GitHub Pages
Your changes will automatically deploy to GitHub Pages within a few minutes.

## 🎨 Product Data Structure
Each product includes:
- Basic info (title, subtitle, brand, size, price, color)
- Images (main, gallery, thumbnail)
- Features and description
- Specifications (auto-generated based on selections)
- Ratings and reviews
- Category and tags

## 📝 Best Practices

### Image Guidelines:
- Use high-resolution images (800x800px minimum)
- Ensure all images are from the same source for consistency
- Include at least 4 gallery images for better user experience

### Product Information:
- Write clear, compelling product titles
- Include detailed descriptions highlighting luxury aspects
- Add 3-4 key features that differentiate the product
- Use realistic review counts (50-200 range)

### Brand Consistency:
- Maintain consistent styling across all products
- Use proper brand names (Hermès, not Hermes)
- Ensure color names match the actual product images

## 🔧 Troubleshooting

### Common Issues:
1. **Images not loading**: Check if URLs are accessible and properly formatted
2. **Form validation errors**: Ensure all required fields are filled
3. **JSON export issues**: Refresh the page and try again

### Tips:
- Always test new products on your local server before deploying
- Keep backup copies of your products.json file
- Use the "View Product List" feature to review existing products

## 📱 Mobile Compatibility
The Product Manager works on both desktop and mobile devices, making it easy to manage your products from anywhere.

## 🔐 Security Note
This tool is designed for local development. Do not expose the product manager to the public internet without proper authentication. 