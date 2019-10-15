# Custom Component Package

This project is in format of a Component Package. Component Packages are the
recommended way to organize Bots Custom Components code and allow the custom
component code to be more portable to different runtime environments.

> Generated by `@oracle/bots-node-sdk` on **Wed Oct 09 2019**

## Structure

```text
.
├── .npmignore
├── components
│   └── ...
├── main.js
├── package.json
└── spec
    └── ...
```

| | Description |
|--|--|
| `.npmignore` | Ignore files when packaging as `npm` module |
| `components` | Directory _(default)_ where Component implementations are added |
| `main.js` | Entrypoint for the Custom Component Package configuration |
| `spec` | Placeholder for unit test implementations |

The Component Package behaves like any other `npm` project. Directly install
any dependencies or tools required to implement the customizations.

## Development

With `@oracle/bots-node-sdk` as a `devDependency` in a Component Package
gives the project some valuable command line functionality.

> **TIP:** Use `npm run bots-node-sdk` for additional CLI help and usage information.

This component package is ready to run as a local development service. Once the
service starts you may use a local tunnel, such as [`ngrok`](https://ngrok.com/),
and configure an _External_ Service to connect the components to your Skill.

```shell
npm start
# or run with additional options
npm run bots-node-sdk -- service .
# or run with debugger
node --inspect $(npm bin)/bots-node-sdk service .
```

With custom component services running, test endpoints like so:

```shell
# get component metadata
curl -X GET localhost:3000/components

# invoke custom component
curl -H "Content-Type: application/json" -d @./spec/test.req.json localhost:3000/components/oke
```

## Deployment

As this package is designed to be installed and run with a corresponding service
wrapper, run `npm pack` and upload the resulting `.tgz` as a package for
the _Embedded Container_ service.

```shell
npm pack
# or validate and package with the @oracle/bots-node-sdk command line
npm run bots-node-sdk -- pack .
```

> **TIP:** use `npm run bots-node-sdk -- pack --help` for additional packaging
options.
