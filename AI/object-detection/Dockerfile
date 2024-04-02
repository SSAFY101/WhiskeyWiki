# 베이스 이미지로 Anaconda를 포함한 이미지 사용
FROM continuumio/anaconda3

# object-detection 디렉토리 생성 및 현재 디렉토리의 파일 복사
RUN mkdir /object-detection
ADD . /object-detection
WORKDIR /object-detection

# environment.yml 파일을 사용하여 Conda 환경 생성
# 이 명령은 environment.yml 파일 내에 정의된 모든 패키지를 설치합니다.
RUN conda env create -f environment.yml

# Conda 환경을 활성화하고 필요한 패키지를 설치하는 단계는
# environment.yml 파일에 의해 자동으로 처리되므로 생략

# 8000 포트로 설정
EXPOSE 8000

# 컨테이너가 실행될 때 FastAPI 애플리케이션을 Uvicorn으로 실행
# 여기서 'myenv'는 실제로 생성한 Conda 환경의 이름과 일치해야 합니다.
# 'base' 환경을 사용하는 경우 'base'로 변경하세요.
CMD ["conda", "run", "-n", "base", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]