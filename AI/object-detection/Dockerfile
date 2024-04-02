# 베이스 이미지로 Miniconda를 사용하여 Python 및 Conda가 설치된 이미지 선택
FROM continuumio/miniconda3

# 작업 디렉토리 설정
WORKDIR /app

# 현재 디렉토리의 파일을 컨테이너의 /app 디렉토리로 복사
COPY . /app

# environment.yml 파일을 사용하여 Conda 환경 생성
RUN conda env create -f environment.yml

# 환경변수 설정으로 Conda 환경을 활성화하기 위한 쉘 지정
SHELL ["conda", "run", "-n", "base", "/bin/bash", "-c"]

# 애플리케이션에 필요한 추가적인 패키지 설치가 필요한 경우 여기에 추가
# 예: RUN pip install some-package

# 8000 포트를 컨테이너 외부로 노출
EXPOSE 8000

# 컨테이너가 실행될 때 FastAPI 애플리케이션 실행
# Conda 환경을 활성화하고, uvicorn을 사용하여 FastAPI 애플리케이션을 호스트합니다.
CMD ["conda", "run", "-n", "base", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
