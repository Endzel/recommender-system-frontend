'use strict'
const utils = require('./utils')
const config = require('../config')
const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  transformAssetUrls: {
    'video': ['src', 'poster'],
    'source': 'src',
    'img': 'src',
    'image': 'xlink:href',
    'b-img': 'src',
    'b-img-lazy': ['src', 'blank-src'],
    'b-card': 'img-src',
    'b-card-img': 'img-src',
    'b-carousel-slide': 'img-src',
    'b-embed': 'src'
  }
}
