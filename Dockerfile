FROM quay.io/ukhomeofficedigital/nodejs-base:v8

ENV USER user_hocs_frontend
ENV USER_ID 1000
ENV GROUP group_hocs_frontend

RUN groupadd -r ${GROUP} && \
    useradd -r -u ${USER_ID} -g ${GROUP} ${USER} -d /app && \
    mkdir -p /app && \
    chown -R ${USER}:${GROUP} /app

WORKDIR /app
COPY . /app
RUN npm install
RUN npm run build-dev

USER ${USER_ID}

EXPOSE 3000

CMD npm run start
