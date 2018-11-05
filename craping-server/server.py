from flask import Flask, jsonify
from flask import request

from crapper import InstagramScraper

app = Flask(__name__)

@app.route('/api/instgram_crapper',  methods=['POST'])
def crape():
    if not request.json or not 'url' in request.json:
        abort(400)
    url = request.json.get('url')

    crapper = InstagramScraper()
    results = ('location' in url) and crapper.location_page_recent_posts(url) or crapper.profile_page_recent_posts(url)
    return jsonify({'results': results}), 201

if __name__ == '__main__':
    print('craping server starts at 5000')
    app.run(debug=True, host='0.0.0.0')
