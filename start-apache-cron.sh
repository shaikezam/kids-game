#!/bin/bash
# Start cron
service cron start

# Start Apache in the foreground
apache2-foreground