# Import library in used
from flask import Flask, render_template, request, jsonify, render_template
import requests

# Declared the app with static path
app = Flask(__name__, static_url_path='/static')

# Kunci API IQAir Anda
API_KEY = 'de4931a4-f8d6-4e16-a17d-c03a2ebf4c51'


@app.route('/get_air_quality', methods=['GET'])
def get_air_quality():
    # Prepare the params
    latitude = request.args.get('latitude')
    longitude = request.args.get('longitude')

    # Call API IQAir with params
    url = f'http://api.airvisual.com/v2/nearest_city?lat={latitude}&lon={longitude}&key={API_KEY}'
    try:
        response = requests.get(url)
        if response.status_code == 200:
            air_quality_data = response.json()
            # Return success with the data
            return jsonify(air_quality_data)
        else:
            # Return failed with message
            return jsonify({'error': 'Gagal mengambil data kualitas udara dari IQAir API'}), 500
    except Exception as e:
        # Return error with message
        return jsonify({'error': 'Terjadi kesalahan saat mengambil data kualitas udara: ' + str(e)}), 500


@app.route("/", methods=["GET"])
def index():
    # Home base
    return render_template("dashboard.html")


# Run the app
if __name__ == "__main__":
  app.run(debug=True)
