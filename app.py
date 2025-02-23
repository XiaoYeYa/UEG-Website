from flask import Flask, render_template, request, redirect, url_for, flash
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.config['SECRET_KEY'] = 'ueg_secret_key_2044'  # 在生产环境中应使用环境变量
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///ueg.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login'

# 数据模型
class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    citizen_id = db.Column(db.String(20), unique=True, nullable=False)
    role = db.Column(db.String(20), default='citizen')

class News(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    content = db.Column(db.Text, nullable=False)
    date = db.Column(db.DateTime, default=datetime.utcnow)
    category = db.Column(db.String(50))

class HistoricalEvent(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    year = db.Column(db.Integer, nullable=False)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    impact = db.Column(db.Text)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route('/')
def index():
    latest_news = News.query.order_by(News.date.desc()).limit(5).all()
    return render_template('index.html', news=latest_news)

@app.route('/news')
def news():
    page = request.args.get('page', 1, type=int)
    news_items = News.query.order_by(News.date.desc()).paginate(page=page, per_page=10)
    return render_template('news.html', news_items=news_items)

@app.route('/citizen-system')
@login_required
def citizen_system():
    return render_template('citizen_system.html')

@app.route('/underground-cities')
def underground_cities():
    return render_template('underground_cities.html')

@app.route('/history')
def history():
    events = HistoricalEvent.query.order_by(HistoricalEvent.year).all()
    return render_template('history.html', events=events)

@app.route('/government')
def government():
    return render_template('government.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        user = User.query.filter_by(username=username).first()
        
        if user and check_password_hash(user.password, password):
            login_user(user)
            flash('登录成功！', 'success')
            return redirect(url_for('index'))
        else:
            flash('用户名或密码错误。', 'danger')
    
    return render_template('login.html')

@app.route('/logout')
@login_required
def logout():
    logout_user()
    flash('您已成功登出。', 'success')
    return redirect(url_for('index'))

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        citizen_id = request.form.get('citizen_id')
        
        if User.query.filter_by(username=username).first():
            flash('用户名已存在。', 'danger')
            return redirect(url_for('register'))
            
        if User.query.filter_by(citizen_id=citizen_id).first():
            flash('公民ID已注册。', 'danger')
            return redirect(url_for('register'))
        
        hashed_password = generate_password_hash(password)
        new_user = User(username=username, password=hashed_password, citizen_id=citizen_id)
        db.session.add(new_user)
        db.session.commit()
        
        flash('注册成功！请登录。', 'success')
        return redirect(url_for('login'))
    
    return render_template('register.html')

@app.route('/services/lottery')
def lottery():
    return render_template('services/lottery.html')

@app.route('/services/communication')
def communication():
    return render_template('services/communication.html')

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True) 