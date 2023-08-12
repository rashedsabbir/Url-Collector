import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin
from concurrent.futures import ThreadPoolExecutor
from collections import deque

def crawl_website(base_url):
    def get_all_urls(url):
        visited_urls = set()
        visited_urls.add(url)

        session = requests.Session()

        queue = deque()
        queue.append(url)

        def process_link(link):
            href = link.get('href')
            if href and href.startswith('/'):
                href = urljoin(base_url, href)

            if (
                href
                and href.startswith(base_url)
                and not href in visited_urls
                and not href.endswith(('.pdf', '.jpg', '.png', '.jpeg', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.mp3', '.mp4'))
            ):
                visited_urls.add(href)
                queue.append(href)

        count = 0
        while queue:
            current_url = queue.popleft()
            count += 1
            print(f'Visiting URL {count}: {current_url}')  # Print the last visited URL

            try:
                reqs = session.get(current_url)
                if reqs.status_code == 200:
                    soup = BeautifulSoup(reqs.text, 'html.parser')
                    with ThreadPoolExecutor(max_workers=4) as executor:
                        executor.map(process_link, soup.find_all('a'))
            except requests.exceptions.ConnectionError as e:
                print(f"ConnectionError: {e}")
                continue

        return visited_urls

    url = base_url
    all_urls = get_all_urls(url)

    filtered_urls = [url for url in all_urls if url.startswith(base_url)]  # Filter URLs that start with the base_url
    return filtered_urls

def save_links_to_file(links, filename):
    with open(filename, 'w') as file:
        for link in links:
            file.write(link + '\n')
