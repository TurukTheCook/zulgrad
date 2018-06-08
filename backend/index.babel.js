require('babel-polyfill');
require('babel-register')({
  presets:[['env', {
			"targets": {
        	"node": "current"
      		}
		}]]
})

require('./index')
