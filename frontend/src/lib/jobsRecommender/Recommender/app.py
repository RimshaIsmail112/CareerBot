from flask import Flask, request, jsonify
from jobsRecommender import recommend_jobs, recommend_candidates

app = Flask(__name__)


@app.route('/')
def hello_world():
    return 'Hello World!'


@app.route('/recommend-jobs', methods=['POST'])
def recommend_jobs_route():
    if request.method == 'POST':
        data = request.get_json()
        jobs_data = data['jobsData']
        resume_data = data['resumeData']
        recommended_jobs = recommend_jobs(jobs_data, resume_data)
        return jsonify(recommended_jobs)
    else:
        return jsonify({'message': 'Nothing to see here!'})


@app.route('/recommend-candidates', methods=['POST'])
def recommend_candidates_route():
    if request.method == 'POST':
        data = request.get_json()
        candidates_data = data['candidatesData']
        job_description = data['jobDescription']
        recommended_candidates = recommend_candidates(candidates_data, job_description)
        return jsonify(recommended_candidates)
    else:
        return jsonify({'message': 'Nothing to see here!'})


if __name__ == '__main__':
    app.debug = True
    app.run(port=8080)
