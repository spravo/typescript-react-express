FROM ubuntu:16.04

ENV DIR                 /usr/src
ENV PROJECT_NAME        app
ENV PROJECT_DIR         $DIR/$PROJECT_NAME

# install system-wide deps for node
RUN apt-get -yqq update \
    && apt-get -yqq install nodejs npm

RUN ln -s /usr/bin/nodejs /usr/bin/node

# Install app dependencies
# use changes to package.json to force Docker not to use the cache
# when we change our application's nodejs dependencies:
ADD package.json /tmp/package.json
RUN cd /tmp \
    && npm install
RUN mkdir -p $PROJECT_DIR && cp -a /tmp/node_modules $PROJECT_DIR

# Install othre app dependencies
ADD typings.json /tmp/typings.json
RUN cd /tmp \
    && ./node_modules/.bin/typings install \
    && cp -a /tmp/typings $PROJECT_DIR

# Copy our application code
ADD . $PROJECT_DIR
WORKDIR $PROJECT_DIR

EXPOSE 3000

CMD sh -c "npm run start:prod"
