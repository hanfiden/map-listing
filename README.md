App production: <a href="https://map-listing.herokuapp.com/" target="_blank">here</a>

# To start app:

```console
git clone git@github.com:hanfiden/map-listing.git
cd map-listing
touch .env
bundle install
yarn install
rails db:create
rails db:migrate
rails db:seed
rails s
```

## Don't forget to add mapbox api key url into .env file
MAPBOX_API_KEY=**************************
