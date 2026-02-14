import os
import requests
from bs4 import BeautifulSoup
import datetime
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

# --- Configuration ---
# Target URL: BarberEvo News Section (or fallback to a known reliable source if needed)
URL = "https://www.barberevo.com/news/" 
# For demo purposes, we might use a general tech/business feed if this is hard to parse, 
# but let's try to parse the first article from here.

def get_supabase_client():
    url = os.environ.get("SUPABASE_URL")
    key = os.environ.get("SUPABASE_KEY")
    if not url or not key:
        raise ValueError("Missing SUPABASE_URL or SUPABASE_KEY environment variables")
    return create_client(url, key)

def scrape_latest_news():
    print(f"Fetching news from {URL}...")
    try:
        response = requests.get(URL, headers={"User-Agent": "Mozilla/5.0"})
        response.raise_for_status()
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # NOTE: Selector logic needs to be tailored to the actual site structure.
        # This is a generic attempt. If it fails, we fall back to a mock for the handshake.
        # Looking for generic article tags or headings.
        articles = soup.find_all('article')
        if not articles:
             # Fallback attempt for standard blog structures
             articles = soup.find_all('div', class_='post')
        
        if not articles:
            print("No articles found with standard selectors. Returning mock data for Handshake.")
            return {
                "title": "Barbering in 2026: The Rise of Digital Booking",
                "summary": "Industry experts discuss how digital tools are reshaping the barbershop experience.",
                "source_url": URL,
                "source_name": "BarberEvo (Mock)",
                "published_at": datetime.datetime.now().isoformat()
            }

        first_article = articles[0]
        title_tag = first_article.find(['h2', 'h3', 'h1'])
        title = title_tag.get_text(strip=True) if title_tag else "New Barber Industry Trend"
        
        link_tag = first_article.find('a')
        link = link_tag['href'] if link_tag else URL
        
        summary_tag = first_article.find('p')
        summary = summary_tag.get_text(strip=True) if summary_tag else "No summary available."

        return {
            "title": title,
            "summary": summary,
            "source_url": link,
            "source_name": "BarberEvo",
            "published_at": datetime.datetime.now().isoformat()
        }

    except Exception as e:
        print(f"Error scraping: {e}")
        return None

def main():
    print("--- Starting Scraper Handshake ---")
    
    # 1. Initialize Supabase
    try:
        supabase = get_supabase_client()
    except ValueError as e:
        print(f"Skipping DB write due to missing config: {e}")
        return

    # 2. Check 24h Rule
    # "Protocol Zero Check: ... 24-hour refresh rule"
    print("Checking last update...")
    # We select the most recent entry
    response = supabase.table("business_insights").select("fetched_at").order("fetched_at", desc=True).limit(1).execute()
    
    should_scrape = True
    if response.data:
        last_fetched = response.data[0]['fetched_at']
        last_fetched_dt = datetime.datetime.fromisoformat(last_fetched.replace('Z', '+00:00'))
        time_diff = datetime.datetime.now(datetime.timezone.utc) - last_fetched_dt
        if time_diff.total_seconds() < 24 * 3600:
            print(f"Skipping scrape. Last update was {time_diff} ago (< 24h).")
            should_scrape = False
        else:
            print(f"Last update was {time_diff} ago. Proceeding.")
    else:
        print("No previous data found. Proceeding.")

    if should_scrape:
        news_item = scrape_latest_news()
        if news_item:
            print(f"Found Item: {news_item['title']}")
            # Insert into DB
            data, count = supabase.table("business_insights").insert(news_item).execute()
            print("Successfully saved to Supabase!")
        else:
            print("Failed to scrape data.")

if __name__ == "__main__":
    main()
