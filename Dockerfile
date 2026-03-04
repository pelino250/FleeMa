FROM python:3.12-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

#Install system dependencies
RUN apt-get update && apt-get install -y \
  postgresql-client \
  libpg-dev \
  && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy project
COPY ..

# Collect static files
RUN python manage.py collectstatic --noinput

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
