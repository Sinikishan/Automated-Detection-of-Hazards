from flask import Flask, render_template,request,redirect,url_for,jsonify
import os,subprocess
from pathlib import Path
x=open("./static/counter.txt","r")
counter=int(x.read())
x.close()
app = Flask(__name__, static_url_path='/static')
result_output={}

@app.route('/upload', methods=['GET', 'POST'])
def upload_file():
    global counter
    if request.method == 'POST':
        f = request.files['file']
        counter=counter+1
        f.filename=str(counter)+".jpeg"
        f.save('./static/dust/'+f.filename)
        fp=subprocess.getoutput("python -m scripts.label_image --graph=tf_files/dust.pb  --image=./static/dust/"+f.filename+" --labels=tf_files/dust.txt")
        print(fp)
        result=fp.splitlines()[-2]
        return jsonify({"result":result)}
    
    if request.method == 'GET':
        return render_template("upload.html")


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)
 