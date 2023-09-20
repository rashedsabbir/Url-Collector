# URL Collector

URL Collector is a web application that allows you to extract links from a website and manage them easily. This repository contains both the client-side and server-side code for the application.

![Desktop View](/screenshots/desktop-view.png)

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Client Side](#client-side)
  - [Server Side](#server-side)
- [Desktop and Mobile View](#desktop-and-mobile-view)
- [Contributors](#contributors)

## Features

- Extract links from a given website URL.
- View and manage the extracted links.
- Copy links to the clipboard with a single click.
- Download all extracted links as a text file.
- Responsive design for both desktop and mobile devices.
- Typewriter animation for an engaging user experience.
- Implemented views and page counts for the website. 

## Tech Stack

### Server Side

- FastAPI
- Selenium
- BeautifulSoup4
- uvicorn
- webdriver_manager
- requests

### Client Side

- React
- Axios
- React Toastify
- Typewriter Effect
- Tailwind CSS
- Vite
- DaisyUI

## Getting Started

### Client Side

To run the client-side of the application, follow these steps:

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/Mushfiqur-Rahman-Robin/url-collector.git
Navigate to the client-side directory:

  ```bash
    cd client-side
  ```

Install dependencies:

  ```bash
      npm install
  ```

Start the development server:

  ```bash
      npm run dev
  ```
The client-side will be available at http://localhost:5173.

Server Side
The server-side of the application is built using FastAPI. You can run it as follows:

# create an environment

```
conda create -n "env name" python==3.9.0
```

# activate the environment

```
conda activate "env name"
```

# install the requirements

```
pip install -r requirements.txt
```

Navigate to the directory:

  ```bash
    cd api
  ```

# run the py file

run one of those commands according to your needs. BeautifulSoup (app_bs) is fast but sometimes fails to grab hidden links. Selenium-based (app_selenium) is slow but efficient in collecting hidden urls.

```
python app_bs.py
python app_selenium.py
```

Desktop and Mobile View
Mobile View

Contributors
This project is maintained by the following contributors:

[Md Mushfiqur Rahman Robin](https://github.com/Mushfiqur-Rahman-Robin)
[Rashedul Hassan Sabbir](https://github.com/rashedsabbir)
Feel free to contribute to the project by opening issues or creating pull requests.

Happy URL collecting!


# url-collector

Url collector assists in collecting all urls of a website that conatains the base url. For example, for 'https://anexample.com' as base url, it will collect other urls that starts with base url, such as "https://anexample.com/ex1". But it won't collect urls like "https://anotherexample.com/ex1". 






