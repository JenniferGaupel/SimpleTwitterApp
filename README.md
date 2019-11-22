# SimpleTwitterApp
Simple Twitter clone using a Rails backend, React frontend, Postgres database, and utilizing Docker Compose
##Setup
1. Install docker
2. Clone this repo
3. Run the docker containers: `docker-compose up`
4. Create the database `docker-compose run backend rake db:create`
5. Migrate the database `docker-compose run backend rake db:migrate`
6. Navigate to http://localhost:3000/
