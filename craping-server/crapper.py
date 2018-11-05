from random import choice
import json

import requests
from bs4 import BeautifulSoup

_user_agents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'
]


class InstagramScraper:
    def __init__(self, user_agents=None, proxy=None):
        self.user_agents = user_agents
        self.proxy = proxy

    def __random_agent(self):
        if self.user_agents and isinstance(self.user_agents, list):
            return choice(self.user_agents)
        return choice(_user_agents)

    def __request_url(self, url):
        try:
            response = requests.get(url, headers={'User-Agent': self.__random_agent()}, proxies={'http': self.proxy,
                                                                                                 'https': self.proxy})
            response.raise_for_status()
        except requests.HTTPError:
            raise requests.HTTPError('Received non 200 status code from Instagram')
        except requests.RequestException:
            raise requests.RequestException
        else:
            return response.text

    @staticmethod
    def extract_json_data(html):
        soup = BeautifulSoup(html, 'html.parser')
        body = soup.find('body')
        script_tag = body.find('script')
        raw_string = script_tag.text.strip().replace('window._sharedData =', '').replace(';', '')
        return json.loads(raw_string)

    def profile_page_metrics(self, profile_url, filename = "file"):
        results = {}
        try:
            response = self.__request_url(profile_url)
            json_data = self.extract_json_data(response)
            metrics = json_data['entry_data']['ProfilePage'][0]['graphql']['user']
        except Exception as e:
            raise e
        else:
            for key, value in metrics.items():
                if key != 'edge_owner_to_timeline_media':
                    if value and isinstance(value, dict):
                        value = value['count']
                        results[key] = value
                    elif value:
                        results[key] = value
        f = open(filename + ".json", "w")
        f.write(str(results))
        f.close()
        return results

    def location_page_recent_posts(self, profile_url, post_link_prefix = "https://www.instagram.com/p/", fname = "file"):
        results = []
        try:
            response = self.__request_url(profile_url)
            json_data = self.extract_json_data(response)
            metrics = json_data['entry_data']['LocationsPage'][0]['graphql']['location']['edge_location_to_media']["edges"]
        except Exception as e:
            raise e
        else:
            for node in metrics:
                node = node.get('node')
                if node and isinstance(node, dict):
                    title = len(node['edge_media_to_caption']['edges']) > 0 and node['edge_media_to_caption']['edges'][0]['node']['text'] or 'No title'
                    number_of_comments = node['edge_media_to_comment']['count']
                    image = node['display_url']
                    number_of_likes = node['edge_liked_by']['count']
                    shortcode = node['shortcode']
                    res = {}
                    res['comments'] = self.extract_link_and_comments(post_link_prefix + shortcode)
                    res['title'] = title
                    res['number_of_comments'] = number_of_comments
                    res['image'] = image
                    res['number_of_likes'] = number_of_likes
                    results.append(res)
        return results

    def profile_page_recent_posts(self, profile_url, post_link_prefix = "https://www.instagram.com/p/", fname = "file"):
        results = []
        try:
            response = self.__request_url(profile_url)
            json_data = self.extract_json_data(response)
            metrics = json_data['entry_data']['ProfilePage'][0]['graphql']['user']['edge_owner_to_timeline_media']["edges"]
        except Exception as e:
            raise e
        else:
            for node in metrics:
                node = node.get('node')
                if node and isinstance(node, dict):
                    title = node['edge_media_to_caption']['edges'][0]['node']['text']
                    number_of_comments = node['edge_media_to_comment']['count']
                    image = node['display_url']
                    number_of_likes = node['edge_liked_by']['count']
                    shortcode = node['shortcode']
                    res = {}
                    res['comments'] = self.extract_link_and_comments(post_link_prefix + shortcode)
                    res['title'] = title
                    res['number_of_comments'] = number_of_comments
                    res['image'] = image
                    res['number_of_likes'] = number_of_likes
                    results.append(res)
        return results

    def extract_link_and_comments(self, post_link):
        results = []
        try:
            response = self.__request_url(post_link)
            json_data = self.extract_json_data(response)
            metrics = json_data['entry_data']['PostPage'][0]['graphql']['shortcode_media']['edge_media_to_comment']['edges']
        except Exception as e:
            raise e
        else:
            for node in metrics:
                node = node.get('node')
                if node and isinstance(node, dict):
                    info = {}
                    info['username'] = node['owner']['username']
                    info['text'] = node['text']
                    results.append(info)
        return results
