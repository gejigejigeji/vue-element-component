#nginx webserver and proxy as the frontend .
FROM gl.wochacha.cn:4000/base/docker-images/frontend:latest

# Set the working directory to /gc-scm-web
RUN mkdir /gc-scm-web

# Copy the current directory contents into the container at /gc-scm-web
COPY --chown=www-data:www-data . /gc-scm-web

# Make port 80 available to the world outside this container
EXPOSE 80

STOPSIGNAL SIGTERM

CMD ["nginx", "-g", "daemon off;"]
