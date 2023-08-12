import uvicorn
from fastapi import FastAPI, Form
from concurrent.futures import ThreadPoolExecutor
from src.bs_extractor import crawl_website, save_links_to_file

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Welcome to the URL Crawler"}

@app.post("/crawl/")
def start_crawling(base_url: str):
    def crawling_task():
        filtered_urls = crawl_website(base_url)
        save_links_to_file(filtered_urls, '../url-collector/collected_links/bs-extracted-links.txt')
        return filtered_urls

    with ThreadPoolExecutor() as executor:
        future = executor.submit(crawling_task)
        result = future.result()

    return {"message": f"Number of links extracted: {len(result)}"}

if __name__ == "__main__":
    uvicorn.run("app_bs:app", host="0.0.0.0", port=8000, reload=True)