from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import PorterStemmer

nltk.download('stopwords')
nltk.download('punkt')


def preprocess_text(text_or_list):
    if isinstance(text_or_list, list):
        return [preprocess_text(text) for text in text_or_list]
    stop_words = set(stopwords.words('english'))
    ps = PorterStemmer()
    words = word_tokenize(text_or_list.lower())
    filtered_words = [ps.stem(word) for word in words if word.isalpha() and word not in stop_words]
    return ' '.join(filtered_words)


def recommend_jobs(jobs_data, resume_data):
    # Preprocess all relevant fields from both jobs_data and resume_data
    job_descriptions = [preprocess_text(job['job_description']) for job in jobs_data]
    resume_skills = preprocess_text(resume_data['skills'])
    resume_experience = [preprocess_text(exp['description']) for exp in resume_data['workExperiences']]
    resume_education = [preprocess_text(edu['description']) for edu in resume_data['education']]

    # Create a single text representation for each job
    job_texts = []
    for job_desc in job_descriptions:
        # Concatenate job description with a summary of resume information
        # This is a simplified approach; adjust based on your specific needs
        resume_summary = ' '.join(resume_skills + resume_experience + resume_education)
        job_texts.append(job_desc + ' ' + resume_summary)

    # Apply TF-IDF vectorization and cosine similarity calculation
    tfidf_vectorizer = TfidfVectorizer(ngram_range=(1, 2), min_df=2, max_df=0.8, sublinear_tf=True)
    tfidf_matrix_jobs = tfidf_vectorizer.fit_transform(job_texts)
    print(job_texts)

    # Assuming resume_text is a concatenation of all relevant resume fields
    # This should be adjusted based on how you want to represent the resume in the text space
    resume_text = ' '.join(resume_skills + resume_experience + resume_education)
    tfidf_matrix_resume = tfidf_vectorizer.transform([resume_text])
    print(resume_text)
    similarities = cosine_similarity(tfidf_matrix_resume, tfidf_matrix_jobs)[0]
    sorted_indices = np.argsort(similarities)[::-1]
    recommended_jobs = [jobs_data[idx] for idx in sorted_indices]
    print(len(recommended_jobs))
    return recommended_jobs


def recommend_candidates(candidate_data, job_description):
    # Preprocess job description
    preprocessed_job_description = preprocess_text(job_description)

    # Preprocess candidate data
    candidate_summaries = []
    for candidate in candidate_data:
        candidate_skills = preprocess_text(candidate['skills'])
        candidate_experience = [preprocess_text(exp['description']) for exp in candidate['workExperiences']]
        candidate_education = [preprocess_text(edu['description']) for edu in candidate['education']]
        candidate_summary = ' '.join(candidate_skills + candidate_experience + candidate_education)
        candidate_summaries.append(candidate_summary)

    # Apply TF-IDF vectorization and cosine similarity calculation
    tfidf_vectorizer = TfidfVectorizer(ngram_range=(1, 2), min_df=2, max_df=0.8, sublinear_tf=True)
    tfidf_matrix_candidates = tfidf_vectorizer.fit_transform(candidate_summaries)
    job_text = preprocessed_job_description
    tfidf_matrix_job = tfidf_vectorizer.transform([job_text])
    similarities = cosine_similarity(tfidf_matrix_job, tfidf_matrix_candidates)[0]
    sorted_indices = np.argsort(similarities)[::-1]
    recommended_candidates = [candidate_data[idx] for idx in sorted_indices]
    return recommended_candidates
