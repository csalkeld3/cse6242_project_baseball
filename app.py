from flask import Flask, render_template, send_from_directory
import os

app = Flask(__name__)

# Homepage route
@app.route('/')
def home():
    """display home page"""
    return render_template('index.html')

# Route to serve files from the "data" directory
@app.route("/data/<path:filename>")
def get_data(filename):
    data_dir = os.path.join(app.root_path, "data")
    return send_from_directory(data_dir, filename)

@app.route('/page1')
def page1():
    """display page 1"""
    return render_template('page1.html')

@app.route('/page2')
def page2():
    """display page 2"""
    return render_template('page2.html')

@app.route('/visual1')
def visual1():
    """display visual 1"""
    return render_template('skeleton.html')

if __name__ == '__main__':
    app.run(debug=True)
