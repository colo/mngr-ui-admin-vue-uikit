<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

import * as Debug from 'debug'
const debug = Debug('apps:root')

import Pipeline from 'js-pipeline'
import RootPipeline from '../pipelines/index'

import DataSourcesMixin from '@components/mixins/dataSources'

export default {
  mixins: [DataSourcesMixin],

  name: 'home',
  // components: {
  //   HelloWorld
  // }

  data () {
    return {
      height: '0px',

      /**
      * dataSources
      **/
      store: false,

      id: 'all',
      path: 'all',

      components: {
        'all': [{
          source: {
            requests: {
              once: [{
                params: {
                  path: 'all',
                  query: {
                    'from': 'educativa',
                    'index': 'host',
                    'filter': [
                      "r.row('metadata')('tag').contains('enabled').and('nginx').and('vhost')",
                      "r.row('data')('code').gt(399)",
                      "r.row('metadata')('path').eq('educativa.checks.vhosts')",
                      "r.row('metadata')('type').eq('check')",
                      "r.row('metadata')('host').eq('colo')"
                    ]
                  }
                },
                callback: function (tables, metadata, key, vm) {
                  debug('All callback', tables, vm.$options.grid_template)
                }
              }]
            }
          }
        }]
      }
    }
  },
  methods: {
    /**
    * @start pipelines
    **/
    create_pipelines: function (next) {
      debug('create_pipelines')

      let template = Object.clone(RootPipeline)

      let pipeline_id = template.input[0].poll.id

      template.input[0].poll.conn[0].requests = this.__components_sources_to_requests(this.components)

      let pipe = new Pipeline(template)

      this.$options.__pipelines_cfg[pipeline_id] = {
        ids: [],
        connected: [],
        suspended: pipe.inputs.every(function (input) { return input.options.suspended }, this)
      }

      this.__after_connect_inputs(
        pipe,
        this.$options.__pipelines_cfg[pipeline_id],
        this.__resume_pipeline.pass([pipe, this.$options.__pipelines_cfg[pipeline_id], this.id, function () {
          debug('__resume_pipeline CALLBACK')
          pipe.fireEvent('onOnce')
        }], this)
      )

      this.$options.pipelines[pipeline_id] = pipe

      if (next) { next() }
    }

    /**
    * @end pipelines
    **/

  }
}
</script>
