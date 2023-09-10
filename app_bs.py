import uvicorn
from fastapi import FastAPI, Form, Response
from concurrent.futures import ThreadPoolExecutor
from src.bs_extractor import crawl_website, save_links_to_file
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to the URL Crawler"}

@app.get("/get-links")
async def get_links():
    try:
        with open('../url-collector/collected_links/bs-extracted-links.txt', 'r') as file:
            links = file.read().splitlines()
        return {"links": links}
    except FileNotFoundError:
        return {"links": []}

@app.post("/crawl/")
async def start_crawling(base_url: str):
    def crawling_task():
        filtered_urls = crawl_website(base_url)
        save_links_to_file(filtered_urls, '../url-collector/collected_links/bs-extracted-links.txt')
        return filtered_urls

    with ThreadPoolExecutor() as executor:
        future = executor.submit(crawling_task)
        result = future.result()

    async def generate_links():
        for link in result:
            yield link + '\n'

    return StreamingResponse(content=generate_links(), media_type="text/plain")


if __name__ == "__main__":
    uvicorn.run("app_bs:app", host="0.0.0.0", port=8000, reload=True)
