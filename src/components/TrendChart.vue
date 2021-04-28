<template>
  <v-container>
    <!-- <canvas id="planet-chart"></canvas> -->
  </v-container>
</template>

<script>
// import Chart from 'chart.js'
import messages from '../service/messages'
import prices from '../service/prices'

  export default {
    name: 'TrendChart',
    props: {
      selectDate: {
        type: String,
        default: null
      },
      symbolId: {
        type: Number,
        default: null
      }
      // msgChart: {
      //   type: Object,
      //   default: nullS
      // },
    },
    data() {
      return {
        //
        msgChart: {
          data:{
          messages: [
            {
            key: "",
            value: 0
            }
          ]
          }
        },
        priceChart: {
          // data: [ {
          //   first_price: 0,
          //   updated_at: ""
          //   }
          // ]
        },
      }
    },
    mounted: function () {
      let dateFrom = new Date(this.selectDate)
      dateFrom.setDate(dateFrom.getDate() - 14)
      let fromDate = dateFrom.toISOString().split("T")[0]
      let dateTo = new Date(this.selectDate)
      dateTo.setDate(dateTo.getDate() + 15)
      let toDate = dateTo.toISOString().split("T")[0]
      // let symbolId = this.trendSymbolObj.id

      // ------------------msgChart---------------------
      messages.Messages(fromDate , toDate , this.symbolId)
      .then(response => {
      // JSON responses are automatically parsed.
        this.msgChart = response.data
        console.log(this.msgChart)
        // let i
        // for (i=0 ; i < this.msgChart.data.messages.length ; i++) {
        //   let keyItem = this.msgChart.data.messages[i].key.split(" ")[0]
        //   this.keys.push(keyItem)
        //   this.values.push(this.msgChart.data.messages[i].value)
        // }
      })
      .catch(e => {
        this.errors.push(e)
      })

      // ------------------priceChart-------------------------
      // console.log(fromDate)
      // console.log('https://telebourse.ir/api/v1/symbols/'+ symbolId+'/trades?from='+fromDate+'%2000:00:00&to='+toDate+'%2000:00:00&format=day')
      prices.Prices(this.symbolId , fromDate , toDate)
      .then(response => {
      // JSON responses are automatically parsed.
        this.priceChart = response.data
        console.log(this.priceChart)
      })
      .catch(e => {
        this.errors.push(e)
      })
    }
  }

</script>
