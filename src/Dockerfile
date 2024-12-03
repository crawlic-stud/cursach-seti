FROM python:3.12-slim

WORKDIR /app

COPY src/requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY src .
RUN ls

ENTRYPOINT ["pytest"]