import os
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import uvicorn
from typing import Generator
from fastapi import FastAPI, Form, HTTPException
from concurrent.futures import ThreadPoolExecutor
from src.bs_extractor import crawl_website
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware

# Initialization of global list to hold the links.
links = []

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
def get_links():
    # Return links that have been extracted up to this point
    return {"links": links}

@app.post("/crawl/")
async def start_crawling(base_url: str):

    global links

    async def crawling_task(base_url: str) -> Generator[str, None, None]:
        visited_urls = crawl_website(base_url)
        for url in visited_urls:
            yield url  # Yield each visited URL as it's processed

    # Initialize links as an empty list
    links = []

    async def generate_links():
        async for link in crawling_task(base_url):
            links.append(link)  # Append each link to the list
            yield link  # Yield each link as it's processed

    return StreamingResponse(content=generate_links(), media_type="text/plain")

if __name__ == "__main__":
    uvicorn.run("app_bs:app", host="0.0.0.0", port=8000, reload=True)