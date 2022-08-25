from flask import Flask, redirect, url_for, render_template, request
from secret_key import key

app = Flask(__name__)
app.secret_key = key

