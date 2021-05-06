<template>
  <v-container v-show="chartShow">
    <canvas id="trend-chart"></canvas>
  </v-container>
</template>

<script>
import Chart from 'chart.js'
import messages from '../service/messages'
import prices from '../service/prices'
import sentiment from '../service/sentiment'

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
    },
    data() {
      return {
        show: 0,
        chartShow: false,
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
        priceChart: [],
        senseChart: [],
        labelsChart: [],
        valueConversion: [],
        planetTrendChart: {
          type: "bar",
          data: {
            labels: null,
            datasets: [
              {
                label: "تعداد پیام ها",
                data: null,
                backgroundColor: "rgba(71, 183,132,0.5)",
                borderColor: "#47b784",
                borderWidth: 2
              },
              {
                label: "قیمت ها",
                type: "line",
                data: null,
                backgroundColor: "rgba(54,73,93,0.1)",
                borderColor: "#36495d",
                borderWidth: 2
              },
              {
                label: "احساس پیام",
                type: "line",
                data: null,
                backgroundColor: "rgba(255,0,0,0.1)",
                borderColor: "red",
                borderWidth: 2
              }
            ] 
          },
          options: {
            responsive: true,
            lineTension: 1,
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                    padding: 25
                  }
                }
              ]
            }
          }
        }
      }
    },
    mounted: function () {
      let dateFrom = new Date(this.selectDate)
      dateFrom.setDate(dateFrom.getDate() - 14)
      let fromDate = dateFrom.toISOString().split("T")[0]
      let dateTo = new Date(this.selectDate)
      dateTo.setDate(dateTo.getDate() + 15)
      let toDate = dateTo.toISOString().split("T")[0]

      // ------------------msgChart---------------------
      messages.Messages(fromDate , toDate , this.symbolId)
      .then(response => {
        this.msgChart = response.data

        let i
        for (i=0 ; i < this.msgChart.data.messages.length ; i++) {
          let keyItem = this.msgChart.data.messages[i].key.split(" ")[0]
          this.labelsChart.push(keyItem)
          this.valueConversion.push(this.msgChart.data.messages[i].value)
        }
        this.maxOfNumMsg = Math.max(...this.valueConversion)

        this.show = this.show + 1
      })
      .catch(e => {
        this.errors.push(e)
      })

      // ------------------priceChart-------------------------
      prices.Prices(this.symbolId , fromDate , toDate)
      .then(response => {
        let i
        let minn = 100000000
        let maxx = 0
        let tempp = []
        for(i=0 ; i<response.data.data.length ; i++) {
          let y ={ date: '' , price: 0}
          y.date = response.data.data[i].created_at.split(" ")[0]
          y.price = response.data.data[i].finish_price
          if(y.price > maxx) {
            maxx = y.price
          }
          if(y.price < minn) {
            minn = y.price
          }
          tempp.push(y)
        }
        this.priceChart = tempp.map(item => ({ date: item.date , price: (((item.price -minn) / (maxx-minn)) * 50).toFixed(0) }))
      
        this.show = this.show + 10
      })
      .catch(e => {
        this.errors.push(e)
      })
      // ----------------------senseChart------------------------------
      sentiment.Sentiment(this.symbolId , fromDate , toDate)
      .then(response => {
        let l
        let max = 0
        var temp = []
        let min = 100000
        for(l=0; l<  response.data.data.length; l++){
          let x = {date: '' , score: 0}
          x.date = response.data.data[l].date
          x.score = (response.data.data[l].sentiment.positive - response.data.data[l].sentiment.negative ) * response.data.data[l].number_of_messages
          if (x.score > max)
            max = x.score
          if (x.score < min)
            min = x.score
          temp.push(x)
        }
        this.senseChart = temp.map(item => ({ date: item.date, score: (((item.score/(max - min) )) * 50).toFixed(0) })).reverse()

        this.show = this.show + 100
      })
      .catch(e => {
        this.errors.push(e)
      })

      const ctx = document.getElementById('trend-chart');
      new Chart(ctx, this.planetTrendChart);
    },
    watch: {
      show: function() {
        if(this.show === 111){
          // -----Create Main Label-------
          this.planetTrendChart.data.labels = this.labelsChart

          // -----Add Massage Chart Value-----------
          let j
          for(j=0 ; j<this.valueConversion.length ; j++) {
            this.planetTrendChart.data.datasets[0].data.push(((this.valueConversion[j] * 10) / this.maxOfNumMsg))
          }

          // ------Complete priceChart------
          for (let i=0 ; i<this.labelsChart.length ; i++)
          {
            for (let j=i ; j<this.priceChart.length ; j++)
            {
              if (this.labelsChart[i] === this.priceChart[j].date) {
                break
              }
              else {
                if (i===0) {
                  let tempp = {date: this.labelsChart[i] , price: 0}
                  this.priceChart.splice(j, 0, tempp)
                  break
                }
                else {
                  let tempp = {date: this.labelsChart[i] , price: this.priceChart[j-1].price}
                  this.priceChart.splice(j, 0, tempp)
                  break
                }
              }
            } 
          }

          // ------- Add Price Chart Value --------
          let i
          for(i=0 ; i<this.priceChart.length ; i++) {
            this.planetTrendChart.data.datasets[1].data.push(this.priceChart[i].price)
          }

          // ----------Complete senseChart----------
          for (let i=0; i <  this.labelsChart.length; i++)
          {
            for(let j = i; j < this.senseChart.length; j++)
            {
              if(this.labelsChart[i] === this.senseChart[j].date)
              {
                break
              }
              if( i === 0 )
              {
                let temp = {date: this.labelsChart[i] , score: 0 }
                this.senseChart.splice(j, 0, temp)

                break
              } else {
                let temp = {date: this.labelsChart[i] , score: this.senseChart[j-1].score }
                this.senseChart.splice(j, 0, temp)
                break
              }
            }
          }

          // ------- Add Sense Chart Value --------
          for(let q=0; q <  this.labelsChart.length; q++){
            this.planetTrendChart.data.datasets[2].data.push(this.senseChart[q].score)
          }
          
          this.chartShow = true
          
        }
      }
    }
  }

</script>