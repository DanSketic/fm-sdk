# 🧵 Filing-Manager SDK
SDK to develop plugins for [Filing-Manager](https://github.com/DanSketic/Filing-Manager-App)

It makes use of Webpack, ts-loader and babel under the hood.

### ✍ Usage
Installation:

```shell
npm install --save-dev @fm/sdk
```

Develop plugin for development:
```shell
fmsdk --project ./ --target plugin --mode dev
```

Build plugin for production:
```shell
fmsdk --project ./ --target plugin --mode release
```

### 📜 Usage

Manifest file (package.json) should have the property `mainSrc` which indicates where the entry file (aka main file) is located.

Example:

```json
{
	"name": "plugin-example",
	"type":"plugin",
	"version": "1.0.0",
	"mainSrc": "src/main.js",
	"main": "main.js",
	"license": "MIT"
}
```

CLI parameters:

* `--project`: Path of the Plugin's folder where the manifest (package.json) is located
* `--target`: Target type:
	* `plugin` ( aka Dynamic or JavaScript plugin )
	* `iconpack` ( Icons pack )
	* `theme` ( UI themes )
* `--mode`: Build type (dev, release)
* `--platform`: Any webpack target, it defaults to 'node'

Example:

```ts
fmsdk --target plugin --project . --mode release
```

This will generate a release of the plugin you are located in.

### 🤖 Where is this being used?

And Filing-Manager itself.
