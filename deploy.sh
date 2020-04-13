php artisan config:clear 
# Run database migrations
yes | php artisan migrate --env=production
# Run database seeds
php artisan db:seed
