FROM python:3.8

WORKDIR /app

RUN apt-get update
RUN apt-get install build-essential

RUN python -m pip install --upgrade pip
COPY ./requirements.txt .
RUN python -m pip install -r requirements.txt
ENV PRODUCTION=1
ENV PYTHONIOENCODING=utf-8

COPY . .


EXPOSE 8000

CMD ["/bin/sh", "start.sh"]