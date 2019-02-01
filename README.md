Welcome to Changi Airport Passenger check in system for Singapore Eagle Airlines.
Your responsibilities is to make a program that check in passenger
and to see if they are allowed to do check in and is there any additional fee have to be paid.
In order to check in, passenger must fulfill these criterias :

Check in type (economy, premium economy, business class)
Booking Reference Number, 6 digits alphanumeric (FYK29H)
Inform how many baggage (in KG) they bring
Check in 1 hour before the deadline which can be different per flight

Baggage fee is 10.0 SGD per KG, each class have free baggage allowance

economy : 7KG
premium economy : 15KG
business class : 25KG

For example :

We input FTY22, Economy, 8KG, checked in 3PM on 4PM flight : NOT FOUND
We input FTY22X, Economy, 6KG, checked in 3PM on 4PM flight : ALLOWED
We input FTY22X, Economy, 9KG, checked in 3PM on 4PM flight : ALLOWED with 20.0 SGD extra fee
We input FTY22X, Premium eco, 10KG, checked in 3PM on 4PM flight : ALLOWED
We input FTY22X, Economy, 7KG, checked in 3PM on 2PM flight : NOT FOUND
We input FTY22X, Economy, 13KG, checked in 3PM on 3.30PM flight : NOT ALLOWED