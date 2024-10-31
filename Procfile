release: python manage.py makemigrations && python manage.py migrate
web: gunicorn epona_drf_api.wsgi --log-file -