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

#FROM continuumio/anaconda3
#
#RUN mkdir /object-detection
#ADD . /object-detection
#WORKDIR /object-detection
#
#
## Conda 환경 파일을 사용하여 환경 생성
#RUN conda env export -n environment -f environment.yml --from-history
##RUN pip3 install opencv-python
##RUN apt-get update
##RUN apt-get -y install libgl1-mesa-glx
##RUN pip install websocket
##RUN pip install channels
##RUN pip install fastapi 'uvicorn[standard]'
#
#EXPOSE 8000
## 컨테이너 생성 및 실행 시 실행하는 명령어
#CMD ["uvicorn", "backend_ai_conda.asgi:application", "--host", "0.0.0.0", "--port", "8000", "--reload"]

#FROM continuumio/anaconda3
#
#RUN mkdir /object-detection
#ADD . /object-detection
#WORKDIR /object-detection
#
#
## Conda 환경 파일을 사용하여 환경 생성
#RUN conda env export -n environment -f environment.yml --from-history
#RUN pip install fastapi
#RUN conda install -c conda-forge uvicorn
#
#EXPOSE 8000
## 컨테이너 생성 및 실행 시 실행하는 명령어
#CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]

#FROM continuumio/anaconda3
#
## 작업 디렉토리 설정 및 소스 코드 추가
#RUN mkdir /object-detection
#ADD . /object-detection
#WORKDIR /object-detection
#
## environment.yml을 사용하여 Conda 환경 생성
#RUN conda env create -f environment.yml
#
## 생성된 Conda 환경 활성화. CMD에서 직접 실행 시 환경이 활성화되지 않으므로,
## 실행할 명령어를 sh -c 내에서 실행하여 환경을 활성화합니다.
#EXPOSE 8000
#CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]


# 베이스 이미지 선택
FROM continuumio/miniconda3

## 작업 디렉토리 설정 및 소스 코드 추가
#RUN mkdir /object-detection
#ADD . /object-detection
#WORKDIR /object-detection
#
## environment.yml 파일을 사용하여 Conda 환경 생성
#RUN conda env create -f /environment.yml


RUN mkdir /object-detection

COPY requirements.txt /object-detection

COPY . /object-detection

WORKDIR /object-detection

RUN pip install -r requirements.txt

EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]


