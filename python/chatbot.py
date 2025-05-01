from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Define common career questions and answers
career_faq = {
    "how do i prepare for an interview":
        "Prepare for interviews by researching the company, practicing common questions, preparing examples of your achievements, dressing professionally, and having questions ready for the interviewer. Mock interviews with friends can also help build confidence.",

    "what skills are in demand":
        "Currently in-demand skills include data analysis, digital marketing, programming (especially Python, JavaScript), AI/ML knowledge, cloud computing, project management, UX/UI design, and soft skills like communication and adaptability.",

    "how to switch careers":
        "To switch careers: 1) Identify transferable skills, 2) Gain relevant qualifications through courses or certifications, 3) Network in your target industry, 4) Update your resume to highlight relevant experience, 5) Consider starting with an entry-level position or internship.",

    "best careers for work-life balance":
        "Careers known for good work-life balance include web development, data analysis, digital marketing, technical writing, accounting, human resources, and certain healthcare roles like occupational therapy. Remote work opportunities have also expanded across many fields.",

    "highest paying careers in india":
        "Some of the highest paying careers in India include: Software Development (especially AI/ML), Investment Banking, Management Consulting, Chartered Accountancy, Medical Professionals, Data Science, Corporate Law, Aviation (Pilots), Product Management, and Senior Management roles in large corporations. Salaries vary based on experience, location, and company.",

    "how to improve my resume":
        "Improve your resume by: 1) Tailoring it to each job application, 2) Highlighting achievements with quantifiable results, 3) Using relevant keywords from the job description, 4) Keeping it concise (1-2 pages), 5) Including a professional summary, 6) Using bullet points for readability, and 7) Proofreading carefully.",

    "best careers for introverts":
        "Careers well-suited for introverts include: Software Development, Data Analysis, Accounting, Technical Writing, Research, Graphic Design, Content Creation, and various remote work positions that require minimal team interaction.",

    "how to negotiate salary":
        "When negotiating salary: 1) Research industry standards, 2) Highlight your value and achievements, 3) Consider the entire compensation package, 4) Practice your negotiation beforehand, 5) Start slightly higher than your target, 6) Remain professional and positive, and 7) Get the final offer in writing.",
}

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data.get('message', '').lower()
    
    # Process the message and generate a response
    response = "I'm not sure about that. Could you ask something related to career guidance?"

    # Check for exact matches in FAQ
    if user_message in career_faq:
        response = career_faq[user_message]
    else:
        # Check for partial matches
        for question, answer in career_faq.items():
            if question in user_message or user_message in question:
                response = answer
                break

        # Handle common career-related questions
        if "salary" in user_message or "pay" in user_message:
            response = "Salaries vary widely by industry, location, experience, and education. In India, entry-level positions typically range from ₹3,00,000 to ₹8,00,000 per annum, while mid-level positions can range from ₹8,00,000 to ₹20,00,000. Senior positions often exceed ₹20,00,000 per annum."
        elif "education" in user_message or "degree" in user_message or "qualification" in user_message:
            response = "Educational requirements vary by career. While some technical roles require specific degrees, many fields now value skills and experience alongside formal education. Consider researching specific requirements for your target role and exploring options like degrees, certifications, or bootcamps."
        elif "start" in user_message or "begin" in user_message:
            response = "To start a new career: 1) Research the field thoroughly, 2) Identify required skills and qualifications, 3) Create a learning plan, 4) Network with professionals in the field, 5) Gain relevant experience through internships or projects, and 6) Update your resume to highlight transferable skills."

    return jsonify({"response": response})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
