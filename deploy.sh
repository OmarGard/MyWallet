php artisan cache:clear
php artisan route:clear
php artisan config:clear 
php artisan view:clear 
# Run database migrations
yes | php artisan migrate:fresh
# Run database seeds
php artisan db:seed
