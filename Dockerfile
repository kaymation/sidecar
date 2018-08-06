FROM ubuntu:latest
MAINTAINER Kevin Quigley "kevinmquigley.41@gmail.com"
RUN apt-get update -y
RUN apt-get install -y python-pip python-dev build-essential nodejs npm
COPY ./sidecar /app/sidecar
WORKDIR /app
RUN pip install -r sidecar/requirements.txt

RUN npm run build --prefix sidecar/src/static &

ENTRYPOINT ["python"]
CMD ["sidecar/src/dynamic/__init__.py"]
