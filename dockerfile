FROM python:3.9

# Set environment variables
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

# Set working directory
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy project
COPY . .

# Collect static files
RUN python backend/manage.py collectstatic --noinput

# Command to run the application
CMD gunicorn --chdir backend eduquest_backend.wsgi:application --bind 0.0.0.0:$PORT