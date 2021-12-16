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

# RUN echo $S3_REGION
# ENV S3_REGION=$S3_REGION
# ENV S3_ENDPOINT=$S3_ENDPOINT
# ENV S3_BUCKET=$S3_BUCKET
# ENV S3_ACCESS_KEY=$S3_ACCESS_KEY
# ENV S3_SECRET_KEY=$S3_SECRET_KEY

EXPOSE 8000

CMD ["/bin/sh", "start.sh"]