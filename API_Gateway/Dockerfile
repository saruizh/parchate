FROM python:3.11

WORKDIR /app

COPY . /app

RUN pip install -r requirements.txt
# Expongo puerto 5000
EXPOSE 5000

# Defino comando para ejecutar app en app.py
CMD ["python", "app.py"]
