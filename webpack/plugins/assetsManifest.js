const path = require('path');
const fs = require('fs');

class AssetsManifest {
  constructor(options) {
    this.options = options || {};
  }

  apply(compiler) {
    compiler.plugin('done', function(stats) {
      const assets = stats.toJson().assetsByChunkName;
      const pathFile = path.join(compiler.options.output.path, 'manifest.json');

      fs.stat(compiler.options.output.path, (err, stats) => {
        // TODO: Make better
        if (err) {
          fs.mkdir(compiler.options.output.path, (err) => {
            fs.writeFileSync(pathFile, JSON.stringify(assets));
          });
        } else {
          fs.writeFileSync(pathFile, JSON.stringify(assets));
        }
      });
    });
  }
}

module.exports = AssetsManifest;
