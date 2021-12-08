#./Dockerfile
FROM node:14
#기반이 될 이미지

# 작업디렉토리(default)설정
WORKDIR /usr/src/app

RUN apt-get update -y

# Puppeteer 구동을 위한 Chronium Binary dependency 수동 설정
RUN apt-get install -y \
    fonts-liberation \
    gconf-service \
    libappindicator1 \
    libasound2 \
    libatk1.0-0 \
    libcairo2 \
    libcups2 \
    libfontconfig1 \
    libgbm-dev \
    libgdk-pixbuf2.0-0 \
    libgtk-3-0 \
    libicu-dev \
    libjpeg-dev \
    libnspr4 \
    libnss3 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libpng-dev \
    libx11-6 \
    libx11-xcb1 \
    libxcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxi6 \
    libxrandr2 \
    libxrender1 \
    libxss1 \
    libxtst6 \
    xdg-utils

# 한글 폰트 설치
RUN mkdir /tmp/noto && cd /tmp/noto \
  && wget -q https://noto-website.storage.googleapis.com/pkgs/NotoSansCJKkr-hinted.zip \
  && unzip NotoSansCJKkr-hinted.zip \
  && mkdir -p /usr/share/fonts/opentype/noto \
  && cp NotoSansCJKkr-Regular.otf NotoSansCJKkr-Bold.otf /usr/share/fonts/opentype/noto/ \
  && chmod -R a=rX,u+w /usr/share/fonts/opentype/noto/ \
  && fc-cache -fv \
  && rm -rf /tmp/noto


## Install packages
# 현재 패키지 설치 정보를 도커 이미지에 복사. package-lock.json도 복사하는 것이 안전
RUN cd /usr/src/app
COPY package*.json ./
# 설치 정보를 읽어 들여서 패키지 설치
RUN npm install

## Copy all src files
# 현재경로에 존재하는 모든 소스파일을 이미지에 복사
COPY . .


## Run the application on the port 8000
# 8000번 포트를 외부에 개방하도록 설정
EXPOSE 8000

# === 도커가 이미지를 빌드할 때의 명령어
CMD ["npm", "run", "deploy"]
