# g1 - Depot/U Online Store

### Due: Monday, October 31, 2016

### Info
* On Monday, you will receive mockups produced by a graphic designer
* This site will have the following pages:
    * A welcome page
    * A product list page - Shows tiles of product images, along with title, short description, and price
    * Contact us page - Should have a form where people can input their name, email, and a message. You should use sendgrid to email yourselves in response to this form being filled out.
    * A purchase page - A page that shows the image, name, description, and price for the single product you are purchasing
        * Should have fields for email, card number, CVC, expiration, AND billing zip code
        * Should send an email to the customer thanking them for their purchase, complete with the title of the item they purchased and the amount
    * A navbar at the top of the site
    
### Requirements
* Must use a MySQL database hosted in AWS RDS, and use stored procedures
    * Should have tables for Products and Purchases
    * Products
        * id int AI
        * title varchar(50)
        * description varchar(255)
        * price decimal(5,2)
        * imageurl varchar(500)
    * Purchases
        * id int AI
        * productid int FK for Product id, cascade update, set null on delete
        * price decimal(5,2)
        * stripetransactionid varchar(100)
* Must use Express and NodeJS, hosted in AWS Elastic Beanstalk
* Must use prerender.io
* Must use Stripe for card processing
* Must use Sendgrid or Mailgun for email sending
* Must be responsive (look good on mobile and desktop)
    * Bootstrap's Grid System will be very helpful
    * You can find standalone grid systems if you don't want to use Bootstrap

### Images
* You will be given product images
    * You can save these into a folder named images in your client folder
    * For a file called waterbottle.png in the images folder, the product in the database should have an imageurl value of '/images/waterbottle.png'
* You can use mustache in the src of an image tag to bind to the imageurl of the product
    * You may want to use a background-image instead