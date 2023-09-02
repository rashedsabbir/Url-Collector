import uvicorn
from fastapi import FastAPI, Form, Response
from concurrent.futures import ThreadPoolExecutor
from src.selenium_extractor import crawl_website
from fastapi.responses import StreamingResponse

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Welcome to the URL Crawler"}

@app.post("/crawl/")
async def start_crawling(base_url: str):
    def crawling_task():
        filtered_urls = crawl_website(base_url)
        return filtered_urls

    with ThreadPoolExecutor() as executor:
        future = executor.submit(crawling_task)
        result = future.result()

    async def generate_links():
        for link in result:
            yield link + '\n'

    return StreamingResponse(content=generate_links(), media_type="text/plain")

if __name__ == "__main__":
    uvicorn.run("app_selenium:app", host="0.0.0.0", port=8001, reload=True)
