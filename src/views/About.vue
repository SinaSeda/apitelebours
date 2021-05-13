<template>
  <v-app>  
    <v-app-bar
      app
      clipped-left
      color= "#3f5770"
      dense
    >
      <v-row
        align="center"
        style="max-width: 650px"
      >
        <!-- ----------threshold input---------- -->
        <v-col cols="3">
          <template>
            <v-text-field
              class="vazir"
              color="white"
              v-model="symbol"
              type="string"
              label="نام نماد"
              prepend-icon="mdi-card-text-outline"
            >
              <template #label>
                <span class="colorr">نام نماد</span>
              </template>
            </v-text-field>
          </template>
        </v-col>
        <v-spacer></v-spacer>
        <!-- ----------------------------------- -->
        <!-- -------------from input------------ -->
        <v-col cols="4">
          <v-menu
            v-model="menuFrom"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                class="vazir"
                color="white"
                v-model="dateFrom"
                label="از تاریخ"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              >
              <template #label>
                <span class="colorr">از تاریخ</span>
              </template>
              </v-text-field>
            </template>
            <v-date-picker color="#2c3e50" locale="fa-ir" v-model="dateFrom" @input="menuFrom = false"></v-date-picker>
          </v-menu>
        </v-col>
        <v-spacer></v-spacer>
        <!-- ----------------------------------- -->
        <!-- --------------To input------------- -->
        <v-col cols="4">
          <v-menu
            v-model="menuTo"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                class="vazir"
                color="white"
                v-model="dateTo"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              >
              <template #label>
                <span class="colorr">تا تاریخ</span>
              </template>
              <!-- <template #append>
              </template> -->
              </v-text-field>
            </template>
            <v-date-picker color="#2c3e50" locale="fa-ir" v-model="dateTo" @input="menuTo = false"></v-date-picker>
          </v-menu>
        </v-col>
        <v-spacer></v-spacer>
        <!-- ----------------------------------- -->
        <!-- -----------filter button----------- -->
        <v-col cols="1">
          <template>
            <v-btn @click="startFilter()" icon>
              <v-icon class="colorr" style="font-size: 2vw;">mdi-feature-search-outline</v-icon>
            </v-btn>
          </template>
        </v-col>
        <!-- ----------------------------------- -->
      </v-row>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <v-card v-if="show">
          <v-list-item three-line>
            <v-list-item-content>                  
              <v-list-item-title class="headline mb-1">
                <v-icon style="font-size: 1.5vw;">mdi-check-circle-outline</v-icon><span class="vazir">{{intendedSymbol[0].symbol}}</span>
                <span style="font-size: 1vw;" class="vazir"> ({{intendedSymbol[0].name}})</span>
              </v-list-item-title>
              <v-btn small color= "#3f5770" class="vazir" text :href="'http://www.tsetmc.com/Loader.aspx?ParTree=151311&i=' + intendedSymbol[0].tsetmc_code">
                <v-icon style="font-size: 1.5vw;">mdi-link-variant</v-icon>{{intendedSymbol[0].symbol}} در سایت tmc
              </v-btn>
              </v-list-item-content>

            <v-list-item-avatar
              tile
              size="100"
              color="grey"
            >
              <v-img class="imgBorder" :src="intendedSymbol[0].logo"></v-img>
            </v-list-item-avatar>
          </v-list-item>
          <!-- -------------tabel-------------- -->
          <v-data-table
          :headers="headersOfTabel"
          :items="day"
          class="elevation-1 vazir"
          >
            <template #item.last_price="{ item }">
              {{ item.last_price }}
              <span v-html="getPercent(item.last_price, item.yesterday_price)"></span> 
            </template>

            <template #item.finish_price="{ item }">
              {{ item.finish_price }}
              <span v-html="getPercent(item.finish_price, item.yesterday_price)"></span>
            </template>
          </v-data-table>
          <!-- --------------------------------- -->
        </v-card>
        
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

// import HelloWorld from '@/components/HelloWorld.vue'
import moment from 'jalali-moment'
import searchSymbol from '../service/searchsy'
import prices from '../service/prices'




export default {
  components: {
  },
  data() {
    return {
      symbol: '',
      dateFrom: null,
      dateTo: null,
      menuFrom: false,
      menuTo: false,
      show: false,
      intendedSymbol: [],
      priceData: [],
      labelOfTabel: '',
      headersOfTabel: [
        {
          text: 'تاریخ',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'قیمت روز قبل', value: 'yesterday_price' },
        { text: 'اخرین قیمت', value: 'last_price' },
        { text: 'قیمت پایانی', value: 'finish_price' },
      ],
      day: []

    }
  },
  methods: {
    startFilter() {
      this.day = []
      searchSymbol.Searchs(this.symbol)
      .then(response => {
      this.intendedSymbol = response.data.data
      var dayFrom = moment(this.dateFrom)
      dayFrom.locale('fa');
      var from = dayFrom.format('ddd') + ' ' + dayFrom.format("DD MMMM YYYY")

      var dayTo = moment(this.dateTo)
      dayTo.locale('fa');
      var to = dayTo.format('ddd') + ' ' + dayTo.format("DD MMMM YYYY")

      this.labelOfTabel = " از " + from + " تا " + to
      this.symbolPrices(this.intendedSymbol[0].id, this.dateFrom, this.dateTo)

      this.show = true

      })
      .catch(e => {
        this.errors.push(e)
      })
    },
    symbolPrices(symbolId , dateFrom , dateTo) {
      prices.Prices(symbolId , dateFrom , dateTo)
      .then(response => {
      // JSON responses are automatically parsed.
      this.priceData = response.data.data
      for(let i=0; i<this.priceData.length; i++) {

        var day = moment(this.priceData[i].created_at.split(" ")[0])
        day.locale('fa');
        var jalaliDate = day.format('ddd') + ' ' + day.format("DD MMMM YYYY")
        var obj = {}
        // var pLast = (((this.priceData[i].last_price - this.priceData[i].yesterday_price)/this.priceData[i].yesterday_price)*100)
        // var pFinish = (((this.priceData[i].finish_price - this.priceData[i].yesterday_price)/this.priceData[i].yesterday_price)*100)
        
        
        
        // obj.percentageLast_price = pLast
        // obj.percentageFinish_price = pFinish
        obj.name = jalaliDate
        obj.yesterday_price = this.priceData[i].yesterday_price 
        obj.last_price = this.priceData[i].last_price
        obj.finish_price = this.priceData[i].finish_price
        this.day.push(obj)  
        console.log(this.day)    
      
      }
    })
      .catch(e => {
        this.errors.push(e)
      })
    },
    getPercent(current, yesterday) {
      var percent = (((current-yesterday)/yesterday)*100).toFixed(2)
      if(percent < 0) {
        return "<span class='negative vazir'>" + percent*(-1) + "</span>"
      }
      else if(percent > 0) {
        return "<span class='positive vazir'>" + percent + "</span>"
      }
      else return 0

    }
  },
  mounted: function () {

  },
  // watch: {
  //   show: function () {
  //     if (show === 1) {

  //     }
  //   }
  // }

}
</script>
<style>
.colorr {
  color:white !important;
}
.negative {
  color: red;
  font-size: 0.7vw;
}
.positive {
  color: green;
  font-size: 0.7vw;
}

</style>
