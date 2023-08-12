import uvicorn
from fastapi import FastAPI
from src.selenium_extractor import crawl_website, save_links_to_file

app = FastAPI()

@app.post("/crawl/")
async def start_crawling(base_url: str):
    filtered_urls = crawl_website(base_url)
    save_links_to_file(filtered_urls, '../url-collector/collected_links/selenium-extracted-links.txt')

    return {"message": f"Number of links extracted: {len(filtered_urls)}"}

if __name__ == "__main__":

    uvicorn.run("app_selenium:app", host="0.0.0.0", port=8001, reload=True)