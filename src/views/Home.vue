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
      <v-container fluid>
        <v-row>
          <v-col v-for="(x , i) in trendsArray.trends" :key="i" cols="4">
            <SymbolCrad 
            v-if="trendsArray !== null" 
            :trendSymbolObj="x"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import SymbolCrad from '../components/SymbolCard'
import trendsService from '../service/trends'

export default {
  name: 'Home',
  components: {
    SymbolCrad,
  },
  data() {
    return {
      fromDate: null,
      toDate: null,
      menuFrom: false,
      dateFrom: null, 
      menuTo: false,
      dateTo: null, 
      threshold: null,
      trendsArray: [],
      symbolInfo: [],
      dialog: false,    
    }
  },
  methods: {
    startFilter() {
      this.trendsArray = []
      this.symbolInfo = []
      trendsService.Trends(this.dateFrom , this.dateTo , this.threshold)
      .then(response => {
      // JSON responses are automatically parsed.
      this.trendsArray = response.data

      })
      .catch(e => {
        this.errors.push(e)
      })
    },
  },
}
</script>
