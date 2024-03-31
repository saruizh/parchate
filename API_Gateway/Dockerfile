FROM python:3.11

WORKDIR /app

COPY requirements.txt /app
COPY app.py /app
COPY schema.py /app
COPY resolvers.py /app

RUN pip install -r requirements.txt
# Expongo puerto 5000
EXPOSE 5000

# Defino comando para ejecutar app en app.py
CMD ["python", "app.py"]
