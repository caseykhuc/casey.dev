yarn install
yarn build
cp -a ./build/. /var/www/html
service nginx restart
