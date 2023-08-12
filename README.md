# url-collector

Url collector assists in collecting all urls of a website that conatains the base url. For example, for 'https://anexample.com' as base url, it will collect other urls that starts with base url, such as "https://anexample.com/ex1". But it won't collect urls like "https://anotherexample.com/ex1". 

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

# run the py file

run one of those commands according to your needs. BeautifulSoup (app_bs) is fast but sometimes fails to grab hidden links. Selenium-based (app_selenium) is slow but efficient in collecting hidden urls.

```
python app_bs.py
python app_selenium.py
```