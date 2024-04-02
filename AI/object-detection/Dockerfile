#FROM tiangolo/uvicorn-gunicorn:python3.9-slim
#
#LABEL maintainer="team-erc"
#
#ENV WORKERS_PER_CORE=4
#ENV MAX_WORKERS=24
#ENV LOG_LEVEL="warning"
#ENV TIMEOUT="200"
#
#RUN mkdir /yolov5-fastapi
#
#COPY requirements.txt /yolov5-fastapi
#
#COPY . /yolov5-fastapi
#
#WORKDIR /yolov5-fastapi
#
#RUN pip install -r requirements.txt
#
#EXPOSE 8000
#
#CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]

FROM continuumio/anaconda3

RUN /yolov5-fastapi
ADD . /yolov5-fastapi
WORKDIR /yolov5-fastapi


# Conda 환경 파일을 사용하여 환경 생성
RUN conda env export -n environment -f environment.yml --from-history
#RUN pip3 install opencv-python
#RUN apt-get update
#RUN apt-get -y install libgl1-mesa-glx
#RUN pip install websocket
#RUN pip install channels
#RUN pip install fastapi 'uvicorn[standard]'

EXPOSE 8000
# 컨테이너 생성 및 실행 시 실행하는 명령어
CMD ["uvicorn", "backend_ai_conda.asgi:application", "--host", "0.0.0.0", "--port", "8000", "--reload"]
