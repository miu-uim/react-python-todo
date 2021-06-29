from os import abort
from flask import Flask, request, redirect, make_response, jsonify
import json
from flask_cors import CORS
import psycopg2

app = Flask(__name__, static_folder="./build/static", template_folder="./build")
CORS(app) #Cross Origin Resource Sharing


def get_connection():
    localhost = 'localhost'
    port = '5432'
    users = 'postgres'
    dbnames = 'fr_test'
    passwords = 'mwmw1225zwzw'
    return psycopg2.connect(
        "host=" + localhost + " port=" + port + " user=" + users + " dbname=" + dbnames + " password=" + passwords)

@app.route("/", methods=['GET', 'POST'])
def index():
    with get_connection() as conn:
        with conn.cursor() as cur:
            if request.method == 'POST':
                print(request.get_json()) #params{post_text: title}
                data = request.get_json()
                if data != '':
                    sql = "INSERT INTO todo (title) VALUES (%s)"
                    cur.execute(sql, (data['post_text'],))
                    conn.commit()

                cur.execute('SELECT max(id) FROM todo')
                result2 = cur.fetchall()
                print(result2) # 追加されたタスクのidを取得
                print(type(result2))
                def returnAddId():
                    for i in result2:
                        print(str(i[0]))
                        return str(i[0]) #最新のidを取得
                conn.commit()
                redirect('/')
                return returnAddId()
            elif request.method == 'GET': #初期表示
                cur.execute('SELECT * FROM todo') # *からidに変更
                result = cur.fetchall()
                print(result)
                # tup_result = tuple(result)
                d_result = dict(result) #selectでidのみ指定のため、dic型にできないためコメントアウトへ
                print(d_result)                
                return d_result
            else:
                return abort(400)
    # return returnAddId() #d_resultからresultに変更

@app.route("/delete", methods=['GET', 'POST'])
def delete():
    with get_connection() as conn:
        with conn.cursor() as cur:
            if request.method == 'POST':
                print(request.get_json()) #params{post_id: dbkey}
                data = request.get_json()
                if data != '':
                    sql = "DELETE FROM todo WHERE id = %s"
                    cur.execute(sql, (data['post_id'],))
                    conn.commit()
                    redirect('/')
            cur.execute('SELECT * FROM todo')
            result = cur.fetchall()
            d_result = dict(result)
            print(d_result)
    return jsonify(d_result)

@app.route("/update/<int:Id>", methods=['GET','POST'])
def update(Id):
    # print(Id)
    with get_connection() as conn:
        with conn.cursor() as cur:
            if request.method == 'POST':
                print(request.get_json())
                data = request.get_json()
                if data !='':
                    sql = "UPDATE todo SET title = %s WHERE id = %s"
                    cur.execute(sql, (data['post_text'],Id,))
                    conn.commit()
                    return redirect('/')

if __name__ == "__main__":
    app.debug = True
    app.run(host='127.0.0.1', port=5000)