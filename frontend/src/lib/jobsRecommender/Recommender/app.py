from flask import Flask, request, jsonify
from jobsRecommender import recommend_jobs
app = Flask(__name__)


@app.route('/')
def hello_world():
    return 'Hello World!'


@app.route('/recommend-jobs', methods=['GET', 'POST'])
def recommend_jobs_route():
    if request.method == 'POST':
        data = request.get_json()
        jobs_data = data['jobsData']
        resume_data = data['resumeData']
        recommended_jobs = recommend_jobs(jobs_data, resume_data)
        return jsonify(recommended_jobs)
    else:
        return jsonify({'message': 'Nothing to see here!'})


if __name__ == '__main__':
    app.debug = True
    app.run(port=8080)
