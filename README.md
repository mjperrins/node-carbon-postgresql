<p align="center">
    <a href="http://kitura.io/">
        <img src="https://landscape.cncf.io/logos/ibm-member.svg" height="100" alt="IBM Cloud">
    </a>
</p>

<p align="center">
    <a href="https://cloud.ibm.com">
    <img src="https://img.shields.io/badge/IBM%20Cloud-powered-blue.svg" alt="IBM Cloud">
    </a>
    <img src="https://img.shields.io/badge/platform-node-lightgrey.svg?style=flat" alt="platform">
    <img src="https://img.shields.io/badge/license-Apache2-blue.svg?style=flat" alt="Apache 2">
</p>

# Node.js React Carbon PostGreSQL Starter Kit

React is a popular framework for creating user interfaces in modular components. In this sample application, you will create a web application using Express and React to serve web pages in Node.js, complete with standard best practices, including a health check and application metric monitoring.

This code pattern contains 12 popular UI patterns that make it very easy to construct a dashboard application.

This app contains an opinionated set of components for modern web development, including:

* [React](https://facebook.github.io/react/)
* [Webpack](https://webpack.github.io/)
* [Sass](http://sass-lang.com/) 
* [gulp](http://gulpjs.com/)
* [Carbon](https://www.carbondesignsystem.com/)
* [PostGreSQL](https://node-postgres.com/)

### Building Locally

To get started building this application locally, you can either run the application natively or use the [IBM Cloud Developer Tools](https://cloud.ibm.com/docs/cli?topic=cloud-cli-getting-started) for containerization and easy deployment to IBM Cloud.

### Cloud-Native Application Development

#### Add a Database to your PostGreSQL instance

Run the following DDL while connected to your PostGreSQL instance. This will create a database and a table 
and load it with two rows of values.

```
DROP TABLE IF EXISTS stock_items;

CREATE TABLE stock_items (
	sku_id serial PRIMARY KEY,
	name VARCHAR ( 50 ) UNIQUE NOT NULL,
	stock VARCHAR ( 10 ) NOT NULL,
	description VARCHAR ( 255 ) UNIQUE NOT NULL,
	unit_price NUMERIC(5,2) UNIQUE NOT NULL,
	manufacturer VARCHAR(50) UNIQUE NOT NULL,
	picture_url VARCHAR( 255 ) UNIQUE NOT NULL
);

INSERT INTO stock_items (sku_id, name, stock, description, unit_price, manufacturer, picture_url)
VALUES ('00012020', 'Kettle', 23, 'Electric Kettle', 24.99, 'Ikea', 'https://www.ikea.com/ca/en/images/products/vattentaet-kettle-stainless-steel-black__0713344_PE729450_S5.JPG?f=sg'),
       ('00023350', 'Toaster', 56, 'Electric Toaster', 49.99, 'Amazon', 'https://images-na.ssl-images-amazon.com/images/I/61bHAS2dovL._AC_SX522_.jpg')

SELECT * FROM stock_items;
``` 

### Build Server Code

Install the latest [Node.js](https://nodejs.org/en/download/) 6+ LTS version.

Once the Node tools have been installed, you can download the project dependencies with:

Create a shell script to run the Node.js Server and enable it to access
a remote PostGreSQL instance call it `start.sh` extract the values from the Connection String provided for the Service binding in IBM Cloud.  
```
#!/usr/bin/env bash
export PGCERT={connection.postgres.certificate.certificate.base64 value}
export PGURI={connection.postgres.composed value}
npm run dev
```
Enable the shell script to be executed on the CLI
```
chmod +x start.sh
```

Build and run the server code in a seperate CLI connecting the the remote PostGreSQL instance
```
npm install
npm run build
./start.sh
```
Validate you can access the server component of the application

Open `localhost:3000/stock/connection` to check you connection parameters, check  `localhost:3000` loads the 
simple application and loads the data

#### Build and run the Client Code code
```bash
cd client 
npm install
npm install -g serve
npm run build
serve -s build
```

Open a browser and access the client clode, open `http://localhost:5000`

Validate the Application is connecting to the Database

Modern web applications require a compilation step to prepare your ES2015 JavaScript or Sass stylesheets into compressed Javascript ready for a browser. Webpack is used for bundling your JavaScript sources and styles into a `bundle.js` file that your `index.html` file can import. 

### Deploying to OpenShift

After you have created a new git repo from this git template, remember to rename the project.
Edit `package.json` and change the default name to the name you used to create the template.

Make sure you are logged into the IBM Cloud using the IBM Cloud CLI and have access 
to you development cluster. If you are using OpenShift make sure you have logged into OpenShift CLI on the command line.

```$bash
npm i -g @garage-catalyst/ibm-garage-cloud-cli
```

Use the Cloud-Native Toolkit OpenShift CLI Extentions to register the GIT Repo with Tekton 

```$bash
oc sync {project} --dev
oc pipeline --tekton
```

### Deploying to Cloud Foundry

Add a `manifest.yaml` to you project before kicking off a `cp push`

Define PostGreSQL values in the Cloud Foundry instance, take these from the Service Connection JSON specification
```
PGCERT {connection.postgres.certificate.certificate.base64 value}
PGURI {connection.postgres.composed value}
```

```
cf push
```

***Webpack***

For development mode, use `webpack -d` to leave the sources uncompress and with the symbols intact.

For production mode, use `webpack -p` to compress and obfuscate your sources for development usage.

***Gulp***

Gulp is a task runner for JavaScript. You can run the above Webpack commands in by running:
```bash
gulp
```

To run your application locally:
```bash
npm run start
```

Your application will be running at `http://localhost:3000`.  You can access the `/health` and `/appmetrics-dash` endpoints at the host.

##### Session Store

You may see this warning when running `ibmcloud dev run`:
```
Warning: connect.session() MemoryStore is not
designed for a production environment, as it will leak
memory, and will not scale past a single process.
```

When deploying to production, it is best practice to configure sessions to be stored in an external persistence service.

## Next Steps

* Learn more about augmenting your Node.js applications on IBM Cloud with the [Node Programming Guide](https://cloud.ibm.com/docs/node?topic=nodejs-getting-started).
* Explore other [sample applications](https://cloud.ibm.com/developer/appservice/starter-kits) on IBM Cloud.

## License

This sample application is licensed under the Apache License, Version 2. Separate third-party code objects invoked within this code pattern are licensed by their respective providers pursuant to their own separate licenses. Contributions are subject to the [Developer Certificate of Origin, Version 1.1](https://developercertificate.org/) and the [Apache License, Version 2](https://www.apache.org/licenses/LICENSE-2.0.txt).

[Apache License FAQ](https://www.apache.org/foundation/license-faq.html#WhatDoesItMEAN)



