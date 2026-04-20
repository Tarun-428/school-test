#!/usr/bin/env bash
# build.sh — Render.com build command for Django backend
set -o errexit

pip install -r requirements.txt
python manage.py collectstatic --no-input
python manage.py migrate
