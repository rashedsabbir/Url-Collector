import os
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import uvicorn
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
    return {"links": links}

@app.post("/crawl/")
def start_crawling(base_url: str):

    global links

    def crawling_task(base_url):
        return crawl_website(base_url)

    with ThreadPoolExecutor() as executor:
        links = executor.submit(crawling_task, base_url).result()

    return {"message": "Crawling Finished!"}

if __name__ == "__main__":
    uvicorn.run("app_bs:app", host="0.0.0.0", port=8000, reload=True)