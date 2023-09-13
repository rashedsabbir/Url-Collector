import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin
from collections import deque
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager  # Import webdriver manager

def crawl_website(base_url):
    def get_all_urls(url):
        visited_urls = set()
        visited_urls.add(url)

        session = requests.Session()
        queue = deque()
        queue.append(url)

        chrome_options = Options()
        chrome_options.add_argument("--headless")  # Run the browser in headless mode (without a visible window)
        
        # Use webdriver_manager to automatically download and manage Chrome webdriver
        driver = webdriver.Chrome(ChromeDriverManager().install(), options=chrome_options)

        count = 0
        
        # Clear the file before starting the crawling process
        clear_file()

        while queue:
            current_url = queue.popleft()
            count += 1
            print(f'Visiting URL {count}: {current_url}')
            try:
                reqs = session.get(current_url)
            except requests.exceptions.ConnectionError as e:
                print(f"ConnectionError: {e}")
                continue

            if reqs.status_code == 200:
                soup = BeautifulSoup(reqs.text, 'html.parser')
                expand_elements = soup.find_all(['div', 'span'], attrs={'data-ah-accordion': True, 'data-toggle': True})
                for expand_element in expand_elements:
                    expand_url = expand_element.get('data-ah-accordion') or expand_element.get('data-toggle')
                    if expand_url and expand_url.startswith('/'):
                        expand_url = urljoin(base_url, expand_url)
                        if expand_url not in visited_urls:
                            visited_urls.add(expand_url)
                            queue.append(expand_url)
                            yield expand_url  # Yield the expanded URL
                            save_to_file(expand_url)  # Save the expanded URL to the file

                driver.get(current_url)
                expanded_content = driver.page_source
                expanded_soup = BeautifulSoup(expanded_content, 'html.parser')
                for link in expanded_soup.find_all('a'):
                    href = link.get('href')
                    if href and href.startswith('/'):
                        href = urljoin(base_url, href)

                    if (
                        href
                        and href.startswith(base_url)  # Check if the URL starts with the base_url
                        and not href in visited_urls
                        and not href.endswith(('.pdf', '.jpg', '.png', '.jpeg', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.mp3', '.mp4'))
                        and (not link.has_attr('style') or 'display:none' not in link['style'].lower())
                        and (not link.has_attr('aria-hidden') or link['aria-hidden'].lower() != 'true')
                        and (not link.has_attr('data-wipe-url') or link['data-wipe-url'].lower() != 'true')
                    ):
                        visited_urls.add(href)
                        queue.append(href)
                        yield href  # Yield the crawled URL
                        save_to_file(href)  # Save the crawled URL to the file

        driver.quit()  # Close the browser after crawling

        # If no other URLs were visited except the base URL, add the base URL to the list
        if len(visited_urls) == 1 and list(visited_urls)[0] == base_url:
            yield base_url
            save_to_file(base_url)  # Save the base URL to the file

    def save_to_file(link):
        with open('.././collected_links/selenium-extracted-links.txt', 'a') as file:
            file.write(link + '\n')

    def clear_file():
        # Clear the file contents before starting
        with open('.././collected_links/selenium-extracted-links.txt', 'w') as file:
            file.write("")

    url = base_url
    all_urls = get_all_urls(url)

    for visited_url in all_urls:
        if visited_url:
            yield visited_url  # Yield the visited URL one at a time
