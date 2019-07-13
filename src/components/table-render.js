import Vue from 'vue'
(function(){
  function createElementByType(createElement, options, row){
    if(options.render){
      return options.render.call(null, createElement, row, options)
    }
    let value = row[options.prop]
    value = options.filter? options.filter(row):value
    switch(options.type){
      case 'anchor':
        return createElement('a', value)
      default:
        return createElement('span', value)
    }
  }
  Vue.component('simple-table-render', {
    render: function (createElement) {
      return createElementByType(createElement, this.options, this.row)
    },
    props: ['options', 'row']
  })
})()
