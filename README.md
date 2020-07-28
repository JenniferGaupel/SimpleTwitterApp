# Cattery
Cat-based social app using a Rails backend, React frontend, Postgres database, and utilizing Docker Compose

## Setup
1. Install Docker-ce
2. Clone this repo
3. Run the Docker containers: `docker-compose up`
4. Create the database `docker-compose run backend rake db:create`
5. Migrate the database `docker-compose run backend rake db:migrate`
6. Navigate to http://localhost:3000/
