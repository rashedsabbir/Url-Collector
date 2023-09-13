import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin
from concurrent.futures import ThreadPoolExecutor
from collections import deque

def crawl_website(base_url):
    visited_urls = set()

    def get_all_urls(url):
        visited_urls.add(url)
        session = requests.Session()
        queue = deque()
        queue.append(url)

        def process_link(link):
            nonlocal visited_urls
            href = link.get('href')
            if href and href.startswith('/'):
                href = urljoin(base_url, href)

            if (
                href and href.startswith(base_url)
                and not href in visited_urls
                and not href.endswith(
                    (
                        '.pdf',
                        '.jpg',
                        '.png',
                        '.jpeg',
                        '.doc',
                        '.docx',
                        '.xls',
                        '.xlsx',
                        '.ppt',
                        '.pptx',
                        '.mp3',
                        '.mp4',
                    )
                )
            ):
                visited_urls.add(href)
                queue.append(href)
            return href

        count = 0

        while queue:
            current_url = queue.popleft()
            count += 1
            print(f'Visiting URL {count}: {current_url}') 

            try:
                reqs = session.get(current_url)
                if reqs.status_code == 200:
                    soup = BeautifulSoup(reqs.text, 'html.parser')
                    with ThreadPoolExecutor(max_workers=4) as executor:
                        executor.map(process_link, soup.find_all('a'))
            except requests.exceptions.ConnectionError as e:
                print(f"ConnectionError: {e}")
                continue 

        # returns list of visited URLs all at once
        return list(visited_urls)

    visited_urls = get_all_urls(base_url)
    return visited_urls

