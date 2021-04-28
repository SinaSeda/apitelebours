<template>
<v-app>  
  <v-app-bar
    app
    clipped-left
    color= "#42b983"
    dense
  >
    <v-row
      align="center"
      style="max-width: 650px"
    >
    <!-- <span>از تاریخ</span> -->
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
              v-model="dateFrom"
              label="از تاریخ"
              prepend-icon="mdi-calendar-blank"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker color="#2c3e50" locale="fa-ir" v-model="dateFrom" @input="menuFrom = false"></v-date-picker>
        </v-menu>
      </v-col>
      <v-spacer></v-spacer>
      <!-- ----------------------------------- -->
      <!-- <span>تا تاریخ</span> -->
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
              v-model="dateTo"
              label="تا تاریخ"
              prepend-icon="mdi-calendar-blank"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker color="#2c3e50" locale="fa-ir" v-model="dateTo" @input="menuTo = false"></v-date-picker>
        </v-menu>
      </v-col>
      <v-spacer></v-spacer>
      <!-- ----------------------------------- -->
      <!-- <span>با امتیاز</span> -->
      <!-- ----------threshold input---------- -->
      <v-col cols="3">
        <template >
          <v-text-field
            v-model="threshold"
            type="number"
            label="با امتیاز"
            prepend-icon="mdi-filter-variant"
          ></v-text-field>
        </template>
      </v-col>
      <v-spacer></v-spacer>
      <!-- ----------------------------------- -->
      <!-- -----------filter button----------- -->
      <v-col cols="1">
        <template>
          <v-btn @click="startFilter()" icon>
            <v-icon style="font-size: 2vw;">mdi-gesture-tap</v-icon>
          </v-btn>
        </template>
      </v-col>
      <!-- ----------------------------------- -->
    </v-row>
  </v-app-bar>
  <v-main>
    <!-- Provides the application the proper gutter -->
    <v-container fluid>
      <!-- <v-row>
        <v-col cols="12" sm="6" md="4">
          <v-date-picker
          v-model="date"
          width="290"
          class="mt-4"
        ></v-date-picker>
        </v-col>
        <v-spacer></v-spacer>
      </v-row> -->
                <!-- <v-date-picker
        v-model="picker"
        :first-day-of-week="0"
        locale="fa-ir"
      ></v-date-picker> -->

    <!-- <v-card>
      from: <input type="date" v-model="fromDate">
      to: <input type="date" v-model="toDate">
    </v-card> -->
      <v-row>

        <v-col v-for="(x , i) in trendsArray.trends" :key="i" cols="4">
          <SymbolCrad 
          v-if="trendsArray !== null" 
          :trendSymbolObj="x"
          />
          <!-- <p>{{x.symbol}}</p> -->
          <!-- <p @click="symbolinfo(x.id)">click</p> -->
          <!-- ----------------Dialog---------------------- -->
         
          <!-- -------------------------------------------- -->
          <!-- ------------------------ -->
  <!-- <v-card
    class="mx-auto"
    max-width="344"
    outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">{{x.symbol}}</div>
        <v-list-item-title class="headline mb-1">Headline 5</v-list-item-title>
        <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar
        tile
        size="80"
        color="grey"
      ></v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
      <v-btn text>Button</v-btn>
      <v-btn text>Button</v-btn>
    </v-card-actions>
  </v-card> -->
<!-- ------------------------- -->

          <!-- <v-card class="d-inline-block mx-auto">
            <v-container>
              <v-row justify="space-between">
                <v-col cols="auto">
                  <v-img
                    height="200"
                    width="200"
                    src="https://cdn.vuetifyjs.com/images/cards/store.jpg"
                  ></v-img>
                </v-col>

                <v-col
                  cols="auto"
                  class="text-center pl-0"
                >
                  <v-row
                    class="flex-column ma-0 fill-height"
                    justify="center"
                  >
                    <v-col class="px-0">
                      <p>{{x.symbol}}</p>
                    </v-col>

                    <v-col class="px-0">
                      <v-btn icon>
                        <v-icon>mdi-bookmark</v-icon>
                      </v-btn>
                    </v-col>

                    <v-col class="px-0">
                      <v-btn icon>
                        <v-icon>mdi-share-variant</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-container>
          </v-card> -->
        </v-col>
      </v-row>
      <!-- If using vue-router -->
      <!-- <router-view></router-view> -->
    </v-container>
  </v-main>


<!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
</v-app>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import SymbolCrad from '../components/SymbolCard'
import trendsService from '../service/trends'
// import symbolinfo from '../service/infosymbol'


export default {
  name: 'Home',
  components: {
    SymbolCrad,
  },
  data() {
    return {
      fromDate: null,
      toDate: null,
      arr: ['sina','reza'],
      menuFrom: false,
      // dateFrom: new Date().toISOString().substr(0, 10),
      dateFrom: null, 
      menuTo: false,
      dateTo: null, 
      threshold: null,
      // id: null,
      trendsArray: [],
      symbolInfo: [],
      dialog: false,    
    }
  },
  methods: {
    startFilter() {
      // console.log("dateFrom", this.dateFrom ,"dateTo" , this.dateTo , "threshold" , this.threshold )
      trendsService.Trends(this.dateFrom , this.dateTo , this.threshold)
      .then(response => {
      // JSON responses are automatically parsed.
      this.trendsArray = response.data
      // console.log(this.trendsArray)

      })
      .catch(e => {
        this.errors.push(e)
      })
    },
    // tests() {
    //   console.log("test")
    // }
    // symbolinfo(id) {
    //   symbolinfo.SymbolInfo(id)
    //   .then(response => {
    //   // JSON responses are automatically parsed.
    //   this.symbolInfo = response.data
    //   console.log(this.symbolInfo)
    //   })
    //   .catch(e => {
    //     this.errors.push(e)
    //   })
    // }
  },
  // components: {
  //   // HelloWorld
  // }
}
</script>
