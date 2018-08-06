import os
import sys

from flask import Flask, render_template

from utils.elastic import create_index


def create_app():
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY=os.environ.get('secret_key', 'dev')
    )

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def hello(path):
        return render_template('index.html')

    create_index()

    import api
    app.register_blueprint(api.api)

    return app

if __name__ == '__main__':
    app = create_app()

    app.run(debug=True, host='0.0.0.0')
