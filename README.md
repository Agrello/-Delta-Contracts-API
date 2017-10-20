#API Specification
API specification with examples located on Google Cloud platform:
https://docs.google.com/document/d/1NpZYlfIhAF95ytlW7rqVd2Eel0_uLkAQoGjopwxQwmY

#About the project
This is the main project, that provides users to manipulate with smart contracts.

#Installation
* Clone the project to your folder.
* run `composer install` it will installs all dependencies from composer.lock file and copies .env.example to .env.
* open your favorite DB manager as postgres user and run one-by-one all sql-commands from `database/init script.sql` 
* run migrations, using command `php artisan doctrine:migrations:migrate`
* run creation of certificates for laravel's passport ([https://github.com/dusterio/lumen-passport]), using command `php artisan passport:install`
