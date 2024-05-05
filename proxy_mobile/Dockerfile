FROM nginx:latest
# Copy the ngnix.conf to the container
COPY nginx.conf /etc/nginx/nginx.conf
# Expose port 80 for Nginx
EXPOSE 90
# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]