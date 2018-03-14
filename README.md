# PIE Crust

![PIE Labs](https://raw.githubusercontent.com/pie-labs/pie-crust/master/PILabs.jpg)

PIE Crust is an Angular5-Ionic3 based hybrid app that consumes Ghost Services. Crust serves as the app front end for http://profitinequities.com/. 

## Installation

Crust requires [Node.js](https://nodejs.org/) and [Ghost](https://ghost.org/developers/) to run.

So, it is preferable that you have Angular and ionic globally installed in your system.

```sh
$ npm install -g cordova ionic
```

```sh
$ npm install -g @angular/cli
```


### Installing Ghost

Install the dependencies and devDependencies.

```sh
$ cd ghost
$ npm install
```

Install Knex-Migrator

```sh
$ npm install -g knex-migrator
```

Run Knex-migrator to initialize the ghost database.

```sh
$ knex-migrator init
```

### Installing Crust

Download this codebase and

```sh
npm install
```

Ghost issues a secret code to access the APIs from external sites/apps. You will find this easily either inside the client_trusted_domains table in ghost.db. However, there is another trick. Once you deploy your ghost, you might find this code in your browser. Just use your developer tool and try to find something like below.

```sh
<script type="text/javascript">
ghost.init({
	clientId: "ghost-frontend",
	clientSecret: "8b33a55d6a60"
});
</script>
```

Use this clientSecret code and paste it in ``` \src\providers\ghost-service\ghost-services.ts```

Look for URIs where client_secret="****" is needed. Replace existing one with the one which you have just found out.

Now, run Crust

```sh
ionic serve
```

### Todos

 - Write Tests Cases
 - Add Video Mode and Compression
 - Usability Upgrades
 - Web Performance Tests
