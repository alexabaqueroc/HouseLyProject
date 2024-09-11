FROM python:3

WORKDIR /app

COPY . /app

ENV PYTHONPATH=/app

RUN pip3 install --upgrade pip
RUN pip3 install "fastapi[standard]"
RUN pip3 install -r requirements.txt
