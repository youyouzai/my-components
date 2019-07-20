import Vue from 'vue'
(function(){
  function createElementByType(h, options, row){
    if(options.render){
      return options.render.call(null, h, row, options)
    }
    let value = row[options.prop]
    value = options.formatter? options.formatter(row):value

    const children = []
    switch(options.contentType){
      case 'anchor':
        return (
          <a
            target="_blank"
            href={options.url || '#'}
            style={{textDecoration: 'none', color: '#58b7ff', cursor: 'pointer'}}>
            {value}
          </a>
        )
      case 'img':
        return (
          <img src={value} width="90" height="120" style="cursor: pointer;"></img>
        )
      case 'icon':
        return (
          <i class={value}></i>
        )
      case 'buttons':
        options.data.forEach(child => {
          let clickFun = function(){}
          if(child.click){
            clickFun =  function(){ child.click.call(null, row) }
          }
          children.push(
            <el-button size="mini" type={child.type || 'primary'} on-click={clickFun}>{child.label}</el-button>
          )
        })
        return h('div', children)
      default:
        return h('span', value)
    }
  }
  Vue.component('simple-table-render', {
    render: function (createElement) {
      return createElementByType(createElement, this.options, this.row)
    },
    props: ['options', 'row']
  })
})()
