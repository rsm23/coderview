let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */

require('laravel-mix-tailwind');

mix
    .js('resources/app.js', 'public/javascripts/main.js')
    .sass('resources/app.scss', 'public/stylesheets/style.css')
    .tailwind();