# Scrappify 

Flask web app to scrape reviews from Flipkart, analyze sentiment using VADER, and display results as pie charts.

## Features
- Scrapes multiple pages of Flipkart product reviews
- Uses VADER for sentiment analysis
- Pie chart visualization
- Clean web UI (HTML/CSS)

## Setup

```bash
git clone https://github.com/Aditya0135/scrappify.git
cd scrappify
python -m venv venv
venv\Scripts\activate  # or source venv/bin/activate
pip install -r requirements.txt
python mains.py