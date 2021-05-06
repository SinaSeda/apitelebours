<template>
  <v-hover>
    <template  v-slot="{ hover }">
      <v-container class="vazir">
        <v-row justify="center">
          <v-dialog v-model="dialog" width="70vw">
            <template v-slot:activator="{ on, attrs }">
              <v-card
                :elevation="hover ? 24 : 6"
                class="mx-auto card vazir"
                shaped
                outlined

                v-bind="attrs"
                v-on="on"
                @click="modal()"
              >
                <v-list-item three-line>
                  <v-list-item-content>
                    <v-list-item-title class="headline mb-1">
                      <v-icon style="font-size: 1.5vw;">mdi-check-circle-outline</v-icon><span class="vazir">{{trendSymbolObj.symbol}}</span><br>
                      <span style="font-size: 1vw;"><a :href="'http://www.tsetmc.com/Loader.aspx?ParTree=151311&i=' + symbolInfoo.data.tsetmc_code">
                        <v-icon style="font-size: 1vw;">mdi-link</v-icon><span class="vazir">{{symbolInfoo.data.name}}</span>
                      </a></span>
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      <v-icon style="font-size: 1.5vw;">mdi-calendar-check-outline</v-icon> تاریخ: {{trendSymbolObj.date}}
                    </v-list-item-subtitle>
                    <v-list-item-subtitle>
                      <v-icon style="font-size: 1.5vw;">mdi-plus-circle-outline</v-icon> امتیاز: {{trendSymbolObj.score}} | تعداد پیام : {{trendSymbolObj.number_of_messages}}
                    </v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-avatar
                    tile
                    size="100"
                    color="grey"
                  >
                    <v-img class="imgBorder" :src="symbolInfoo.data.logo"></v-img>
                  </v-list-item-avatar>
                </v-list-item>
              </v-card>
            </template>
  <!-- --------------------Dialoge Content---------------------------- -->
            <v-card>
              <v-list-item three-line>
                <v-list-item-content>                  
                  <v-list-item-title class="headline mb-1">
                    <v-icon style="font-size: 1.5vw;">mdi-check-circle-outline</v-icon><span class="vazir">{{trendSymbolObj.symbol}}</span>
                    <span style="font-size: 1vw;" class="vazir"> ({{symbolInfoo.data.name}})</span>
                  </v-list-item-title>
                  <span class="vazir"><v-icon style="font-size: 1.5vw;">mdi-calendar-check-outline</v-icon> تاریخ: {{trendSymbolObj.date}}</span>
                  <span class="vazir"><v-icon style="font-size: 1.5vw;">mdi-plus-circle-outline</v-icon> امتیاز: {{trendSymbolObj.score}} | تعداد پیام : {{trendSymbolObj.number_of_messages}}</span>
                </v-list-item-content>

                <v-list-item-avatar
                  tile
                  size="100"
                  color="grey"
                >
                  <v-img class="imgBorder" :src="symbolInfoo.data.logo"></v-img>
                </v-list-item-avatar>
              </v-list-item>
              <TrendChart
                :selectDate="trendSymbolObj.date"
                :symbolId="trendSymbolObj.id"
              />
            </v-card>
          </v-dialog>
        </v-row>
      </v-container>
    </template>
  </v-hover>
</template>

<script>
import TrendChart from '../components/TrendChart'
import symbolinfo from '../service/infosymbol'
import messages from '../service/messages'
import prices from '../service/prices'

  export default {
    name: 'SymbolCrad',
    props: {
      trendSymbolObj: {
        type: Object,
        default: null
      }
    },
    components: {
      TrendChart
    },
    data() {
      return {
        symbolInfoo: {
          data: {
            tsetmc_code: "",
            name: "",
            logo: ""
          }
        },
        dialog: false,
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
        priceChart: {},
        keys: [],
        values: [],
      }
    },
    methods: {
      modal() {
        let dateFrom = new Date(this.trendSymbolObj.date)
        dateFrom.setDate(dateFrom.getDate() - 14)
        let fromDate = dateFrom.toISOString().split("T")[0]
        let dateTo = new Date(this.trendSymbolObj.date)
        dateTo.setDate(dateTo.getDate() + 15)
        let toDate = dateTo.toISOString().split("T")[0]
        let symbolId = this.trendSymbolObj.id
        // ------------------msgChart---------------------
        messages.Messages(fromDate , toDate , symbolId)
        .then(response => {
        // JSON responses are automatically parsed.
          this.msgChart = response.data
          let i
          for (i=0 ; i < this.msgChart.data.messages.length ; i++) {
            let keyItem = this.msgChart.data.messages[i].key.split(" ")[0]
            this.keys.push(keyItem)
            this.values.push(this.msgChart.data.messages[i].value)
          }
        })
        .catch(e => {
          this.errors.push(e)
        })
        // ------------------priceChart-------------------------
        prices.Prices(symbolId , fromDate , toDate)
        .then(response => {
        // JSON responses are automatically parsed.
          this.priceChart = response.data
        })
        .catch(e => {
          this.errors.push(e)
        })
      }
    },
    mounted: function () {
      if(this.trendSymbolObj !== null){
        symbolinfo.SymbolInfo(this.trendSymbolObj.id)
      .then(response => {
      // JSON responses are automatically parsed.
      
      this.symbolInfoo = response.data
      })
      .catch(e => {
        this.errors.push(e)
      })
      }

    },
  }
</script>
<style>
.card:hover {
cursor: pointer;
}
.titleModal {
  font-weight: bold;
  color: rgb(22, 77, 52);
}
</style>
