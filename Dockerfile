FROM php:8.4.2-apache

# Enable Apache mod_rewrite
RUN a2enmod rewrite
ENV PHP_ERROR_REPORTING="E_ALL & ~E_DEPRECATED & ~E_USER_DEPRECATED"

# Install system dependencies including cron and composer
RUN apt-get update && apt-get install -y cron curl git unzip \
    && curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Set the working directory
WORKDIR /var/www/html

# Copy application files
COPY . /var/www/html/

# Copy .htaccess if it exists
COPY .htaccess /var/www/html/.htaccess

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader

# Add a cron job to run every 13 minutes
RUN echo "*/13 * * * * curl -s https://kids-game-1-ouyj.onrender.com/ > /dev/null 2>&1" > /etc/cron.d/my-cron-job

# Give execution rights on the cron job
RUN chmod 0644 /etc/cron.d/my-cron-job

# Apply the cron job
RUN crontab /etc/cron.d/my-cron-job

# Start Apache and cron in the foreground
COPY start-apache-cron.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/start-apache-cron.sh

# Expose the default HTTP port
EXPOSE 80

# Start the custom script
CMD ["start-apache-cron.sh"]
