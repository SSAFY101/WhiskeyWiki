# 베이스 이미지로 Miniconda를 사용하여 Python 및 Conda가 설치된 이미지 선택
FROM continuumio/miniconda3

# 작업 디렉토리 설정
WORKDIR /app

# 현재 디렉토리의 파일을 컨테이너의 /app 디렉토리로 복사
COPY . /app

# environment.yml 파일을 사용하지 않고 직접 패키지를 설치합니다.
# 여기서는 예시로 몇 가지 패키지를 나열합니다.
# 실제 필요한 패키지 목록은 environment.yml 파일을 참고하여 작성해야 합니다.
RUN conda install python=3.8
RUN conda install pytorch torchvision cudatoolkit=11.3 -c pytorch
RUN pip install fastapi uvicorn

# 8000 포트를 컨테이너 외부로 노출
EXPOSE 8000

# 컨테이너가 실행될 때 FastAPI 애플리케이션 실행
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]